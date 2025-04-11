from dotenv import load_dotenv
from pydantic_ai import Agent
from pydantic import BaseModel
import requests
from urllib.parse import quote_plus
from typing import List, Dict
import re
import os

load_dotenv()

os.environ['GOOGLE_API_KEY'] = os.getenv('GEMINI_API_KEY')
serp_api_key = os.getenv('SERP_API_KEY')

def generate_folk_lore(location: str):
    MODEL = 'gemini-2.0-flash'
    agent = Agent(
        model=MODEL,
        result_type=str,
        system_prompt= """You are a folklorist, a master of the art of storytelling. 
        You specialize in telling folk lore based on the location provided. 
        You have a deep understanding of the cultural and historical context of the stories you tell. 
        You are able to weave together elements of history, culture, and imagination to create a rich tapestry of 
        narrative that captivates your audience. You are a master of the art of storytelling, and you have a deep 
        understanding of the cultural and historical context of the stories you tell.""",
    )

    prompt = f"Generate a folk lore based on the location: {location}"
    response = agent.run_sync(prompt)
    return response.data

def extract_landmarks_from_itinerary(itinerary: str) -> List[str]:
    """
    Extract potential landmark names from an itinerary text.
    
    Args:
        itinerary: The itinerary text
        
    Returns:
        List of potential landmark names
    """
    # Use regex to find potential landmark patterns
    # This is a simplified approach - you might need more sophisticated NLP
    landmark_patterns = [
        r'visit(?:ing)? ([\w\s]+)',
        r'tour(?:ing)? ([\w\s]+)',
        r'explore(?:ing)? ([\w\s]+)',
        r'see(?:ing)? ([\w\s]+)',
    ]
    
    landmarks = []
    for pattern in landmark_patterns:
        matches = re.finditer(pattern, itinerary, re.IGNORECASE)
        for match in matches:
            landmark = match.group(1).strip()
            # Filter out very short names and common words
            if len(landmark) > 3 and landmark.lower() not in ['the', 'a', 'an']:
                landmarks.append(landmark)
                
    return landmarks

def get_images_for_landmarks(landmarks: List[str]) -> Dict[str, List[str]]:
    """
    Get images for multiple landmarks.
    
    Args:
        landmarks: List of landmark names
        
    Returns:
        Dictionary mapping landmark names to lists of image URLs
    """
    result = {}
    for landmark in landmarks:
        result[landmark] = get_images_for_location(landmark)
    return result

def get_images_for_location(location: str, num_images: int = 3) -> List[str]:
    """
    Get images for a specific location using SerpAPI.
    
    Args:
        location: Location name to search for
        num_images: Number of images to return (default: 3)
        
    Returns:
        List of image URLs
    """
        
    try:
        # Prepare the query
        query = f"{location} tourist attraction landmark"
        encoded_query = quote_plus(query)
        
        # Make request to SerpAPI
        url = f"https://serpapi.com/search.json?q={encoded_query}&tbm=isch&api_key={serp_api_key}"
        response = requests.get(url)
        data = response.json()
        
        # Extract image URLs
        images = []
        if "images_results" in data:
            for i, img in enumerate(data["images_results"]):
                if i >= num_images:
                    break
                images.append(img["original"])
                
        return images
        
    except Exception as e:
        return []


def generate_itinerary(location: str, duration: int = 3, interests: str = ""):
    """
    Generate content based on the given location using the specified model.
    """
    class TripPlannerResponse(BaseModel):
        day_number: int
        itinerary: str
        location_images: list[str]
        location_description: str

    MODEL = 'gemini-2.0-flash'
    agent = Agent(
        model=MODEL,
        result_type=List[TripPlannerResponse],
        system_prompt= """You are a travel agent, a master of the art of trip planning. 
        You specialize in creating personalized itineraries based on the location provided. 
        You have a deep understanding of the cultural and historical context of the places you recommend. 
        You are able to weave together elements of history, culture, and imagination to create a rich tapestry of 
        narrative that captivates your audience.""",
    )
    prompt = f"Create a personalized itinerary for the location {location} for {duration} number of days based on the users interests: {interests} in markdown."
    response = agent.run_sync(prompt)
    
    # Enhance the response with real images
    enriched_data = []
    for day_plan in response.data:
        # Extract landmarks from this day's itinerary
        landmarks = extract_landmarks_from_itinerary(day_plan.itinerary)
        
        # Get images for specific landmarks if available, or fall back to general location images
        if landmarks:
            images = []
            for landmark in landmarks[:2]:  # Limit to first 2 landmarks to avoid too many API calls
                landmark_with_location = f"{landmark}, {location}"
                landmark_images = get_images_for_location(landmark_with_location, num_images=1)
                images.extend(landmark_images)
        else:
            # If no landmarks found, use the general location
            images = get_images_for_location(location)
            
        # Update the day_plan with actual images
        day_plan.location_images = images or day_plan.location_images
        enriched_data.append(day_plan)
        
    return enriched_data
    
