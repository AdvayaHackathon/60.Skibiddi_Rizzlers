import requests
import base64
import json
import os
import shutil
from story_gen import generate_folklore


def synthesize_speech(api_key, text, filename="output.mp3"):
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={api_key}"
    
    payload = {
        "input": {"text": text},
        "voice": {"languageCode": "en-US", "ssmlGender": "NEUTRAL"},
        "audioConfig": {"audioEncoding": "MP3"}
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        audio_content = response.json()['audioContent']
        audio_data = base64.b64decode(audio_content)
        with open(filename, "wb") as out:
            out.write(audio_data)
        print(f"✅ Audio content written to '{filename}'")
    else:
        print(f"❌ Failed to generate speech. Status code: {response.status_code}")
        print(response.text)


def save_story_json(text, output_path="frontend/story.json"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        json.dump({"text": text}, f, indent=2)
    print(f"✅ Story saved to '{output_path}'")


def move_audio_to_frontend(src="output.mp3", dest="frontend/output.mp3"):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copyfile(src, dest)
    print(f"✅ Audio moved to '{dest}'")


# ----------- MAIN FLOW ------------
if __name__ == "__main__":
    api_key = "AIzaSyDzbBjhY9W6MjCUuzR5X5fW7ZaVwG5wf9c"  # Replace with your actual API key
    story = generate_folklore('Bengaluru')
    
    synthesize_speech(api_key, story, filename="output.mp3")
    save_story_json(story, output_path="frontend/story.json")
    move_audio_to_frontend("output.mp3", "frontend/output.mp3")
