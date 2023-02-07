from flask import Flask, jsonify
import whisper as w
import torch
from pyttsx3 import init
from speech_recognition import Recognizer, Microphone, UnknownValueError
import io
import soundfile as sf
import numpy as np

app = Flask(__name__)

model = w.load_model("medium")

def getTranscription(audio):  
   audio = w.load_audio(audio)
   audio = w.pad_or_trim(audio)
   
   mel = w.log_mel_spectrogram(audio).to(model.device)
   
   _, probs = model.detect_language(mel)
   
   transcript_options = w.DecodingOptions(task="transcribe", language="it", fp16 = False)
   
   transcription = w.decode(model, mel, transcript_options)
   print(transcription)
   return transcription.text

engine = init()
r = Recognizer()

def startRecognition():
    res = False
    transcript = ""
    with Microphone() as source:
        r.adjust_for_ambient_noise(source)
        while(not res):
            engine.runAndWait()
            print("Listen...")
            audio = r.listen(source)
            try:
                wav_bytes = audio.get_wav_data(convert_rate=16000)
                wav_stream = io.BytesIO(wav_bytes)
                audio_array, sampling_rate = sf.read(wav_stream)
                audio_array = audio_array.astype(np.float32)
                # transcript = r.recognize_whisper(audio, model="medium", language="it")
                transcript = model.transcribe(audio_array,  language="it", fp16=torch.cuda.is_available())
                res = True
            except UnknownValueError:
                print("Errore nell'ascolto")
            finally:
                if(transcript):
                    return transcript["text"].lower()
                else:
                    print("Errore")
@app.get("/speech")
def getSTT():
    transcript = startRecognition()
    return jsonify(transcript = transcript)