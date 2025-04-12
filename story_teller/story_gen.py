from pydantic_ai.agent import Agent
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from pydantic_ai.models.gemini import GeminiModel
import os

api_key = 'AIzaSyASI6uaH1ZfM4iBdZdxVyAcm-my33zn2NY'

def generate_folklore(location: str):
    MODEL = 'gemini-2.0-flash'
    model = GeminiModel(model_name=MODEL, provider=GoogleGLAProvider(api_key=api_key))
    agent = Agent(
        model=model,
        result_type=str,
        system_prompt="""You are a folklorist, a master of the art of storytelling. 
        You specialize in telling folk lore based on the location provided. 
        You have a deep understanding of the cultural and historical context of the stories you tell. 
        You are able to weave together elements of history, culture, and imagination to create a rich tapestry of 
        narrative that captivates your audience."""
    )

    prompt = f"Generate a folk lore based on the location: {location}"
    response = agent.run_sync(prompt)
    return response.data