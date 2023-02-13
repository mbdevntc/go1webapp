from flask import Flask, jsonify
from flask_cors import CORS
import whisper as w
import torch
import io
import soundfile as sf
import numpy as np

from pyttsx3 import init
from speech_recognition import Recognizer, Microphone, UnknownValueError

app = Flask(__name__)
CORS(app)
model = w.load_model("medium")
engine = init()
r = Recognizer()

def startRecognition():
    transcript = "Non ho capito"
    with Microphone() as source:
        r.adjust_for_ambient_noise(source)
        engine.runAndWait()
        print("Listen...")
        audio = r.listen(source)
        try:
            wav_bytes = audio.get_wav_data(convert_rate=16000)
            wav_stream = io.BytesIO(wav_bytes)
            audio_array, sampling_rate = sf.read(wav_stream)
            audio_array = audio_array.astype(np.float32)
            transcript = model.transcribe(audio_array,  language="it", fp16=torch.cuda.is_available())
        except UnknownValueError:
            print("Errore nell'ascolto")
        finally:
            if(transcript):
                return transcript["text"].lower()
            else:
                print("Errore")
                return transcript

@app.get("/getSpeechToText")
def getSTT():
    # transcript = startRecognition()
    transcript = startRecognition()
    return jsonify(transcript = transcript)

if __name__ == '__main__':
    app.run(host="localhost", port=5000)