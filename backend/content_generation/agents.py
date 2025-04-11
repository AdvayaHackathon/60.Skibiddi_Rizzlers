from dotenv import load_dotenv
from pydantic_ai import Agent
import os

load_dotenv()

os.environ['GOOGLE_API_KEY'] = os.getenv('GEMINI_API_KEY')

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
