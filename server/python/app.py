from flask import Flask, jsonify
from flask_cors import CORS
import whisper as w
import torch
import io
import soundfile as sf
import numpy as np

from pyttsx3 import init
from speech_recognition import Recognizer, Microphone, UnknownValueError

import platform
currentOS = platform.system()
if(currentOS == "Linux"):
    import sys
    import time
    import vlc
    from os import getppid, path, kill
    from multiprocessing import Process
    from signal import SIGKILL

    dirname = path.dirname(__file__)
    robot_interface_path = path.join(dirname, 'lib/amd64')
    song_path = path.join(dirname, 'song/cupidShuffleEdit.mp3')

    # sys.path.append('/home/oreomarco/Desktop/dev/go1webapp/server/python/lib/amd64')
   
    sys.path.append(robot_interface_path)

    import robot_interface as sdk

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
        audio = r.listen(source=source, timeout=8, phrase_time_limit=5)

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

# This function send command to GO1 using udp
def send(udp, cmd):
    udp.SetSend(cmd)
    udp.Send()

# This function control the body of the GO1
def moveBody(udp, cmd, cmdMode, cmdEuler,timer):
    cmd.mode = cmdMode
    cmd.euler = cmdEuler  
    
    send(udp, cmd)

    time.sleep(timer)

# This function change the mode so you can play the animations of the GO1 like: dance 1, dance 2, jumpyaw etc.
def animations(udp, cmd, cmdMode, timer):
    cmd.mode = cmdMode
    
    send(udp, cmd)

    time.sleep(timer)

# This function reset the GO1 commands
def reset(udp, cmd):
    cmd.mode = 0  
    cmd.gaitType = 0
    cmd.speedLevel = 0
    cmd.footRaiseHeight = 0
    cmd.bodyHeight = 0
    cmd.euler = [0, 0, 0]
    cmd.velocity = [0, 0]
    cmd.yawSpeed = 0.0
    cmd.reserve = 0
    
    send(udp, cmd)

# This function make the GO1 walk, you can change the gait, the yaw speed, the Euler and the velocity
def walk(udp, cmd, cmdGait, cmdYawSpeed, cmdEuler, cmdVelocity, timer):
        cmd.mode = 2
        cmd.gaitType = cmdGait
        cmd.yawSpeed = cmdYawSpeed
        cmd.euler = cmdEuler
        cmd.velocity = cmdVelocity
        
        send(udp, cmd)
        
        time.sleep(timer)
   
def connect():
    HIGHLEVEL = 0xee
    
    # Here we can set the level control, now is setted to High 
    udp = sdk.UDP(HIGHLEVEL, 8080, "192.168.123.161", 8082)

    cmd = sdk.HighCmd()
    state = sdk.HighState()
    udp.InitCmdData(cmd)
    return cmd, state, udp

def choreography():
    
    cmd, state, udp = connect()

    # This Variable set the song path 
    song = vlc.MediaPlayer(song_path)

    reset(udp, cmd)

    print("Start Song")
    song.play()
    
    time.sleep(3)

    udp.Recv()
    udp.GetRecv(state)
    
    # CUPID SHUFFLE CHOREOGRAPHY

    # To the right 
    start_time = time.time()
    while (time.time() - start_time) < 2.5:
        walk(udp, cmd, 1, 0, [0,0,0], [0, -0.2], 0.01)
    
    # To the left
    start_time = time.time()
    while (time.time() - start_time) < 3:
        walk(udp, cmd, 1, -0.17, [0,0,0], [0, 0.25], 0.01)
    
    time.sleep(1.5)

    # Animation dance 1 = L1 + X
    animations(12, 16.5)

    # Yaw 360°
    start_time = time.time()
    while (time.time() - start_time) < 2:
        walk(udp, cmd, 1, 3.65, [0, 0, 0],[0, 0], 0.01)
    
    time.sleep(1.5)

    walk(udp, cmd, 1, -0.1, [0, 0, 0],[0, 0.3], 2) 

    # Animation dance 2 = R1 + X, stop after 6.5 seconds
    animations(13, 6.5)


    # Walk in S TO RIGHT
    start_time = time.time()
    while (time.time() - start_time) < 2:
        walk(udp, cmd, 1, 2.8, [0, 0, 0], [0.5, 0], 0.01)
    
    start_time = time.time()
    while (time.time() - start_time) < 2:
        walk(udp, cmd, 1, -3.2, [0, 0, 0], [0.5, 0], 0.01)

    time.sleep(1)

    # To the right
    start_time = time.time()
    while (time.time() - start_time) < 2.5:
        walk(udp, cmd, 1, -0.1, [0,0,0], [0.15, -0.2], 0.01)

    # To the left
    start_time = time.time()
    while (time.time() - start_time) < 3:
        walk(udp, cmd, 1, 0, [0,0,0], [0, 0.4], 0.01)

    time.sleep(1.5)

    # Walk in S TO LEFT
    start_time = time.time()
    while (time.time() - start_time) < 2:
        walk(udp, cmd, 1, -2.8, [0, 0, 0], [0.5, 0], 0.05)
    start_time = time.time()
    while (time.time() - start_time) < 2:
        walk(udp, cmd, 1, 3.1, [0, 0, 0], [0.5, 0], 0.05)
    

    time.sleep(2)
        
    # To the right
    start_time = time.time()
    while (time.time() - start_time) < 2.5:
        walk(udp, cmd, 1, -0.12, [0,0,0], [0.15, -0.2], 0.01)

    # To the left
    start_time = time.time()
    while (time.time() - start_time) < 3:
        walk(udp, cmd, 1, 0, [0,0,0], [0, 0.3], 0.01)


    time.sleep(3)

    # Animation Stand Up
    animations(1, 2)
    
    time.sleep(5)

    # Animation Straight Hands
    animations(11, 8)

    reset()

    # Greetings
    
    # Left
    walk(udp, cmd, 1, 1, [0, 0, 0], [0, 0], 2)
    moveBody(1, [0, 0.6, 0], 2)
    
    # Right
    walk(udp, cmd, 1, -2, [0, 0, 0], [0, 0.1], 2)
    moveBody(1, [0, 0.6, 0], 2)
    
    # Mid
    walk(udp, cmd, 1, 1, [0, 0, 0], [0, 0], 2)      
    for _ in range(2):
        moveBody(1, [0, 0.6, 0], 2)

    print("Stop Song")
    song.stop()

# END

# ROUTES

process_choreo= ""

@app.get("/getSpeechToText")
def getSTT():
    # transcript = startRecognition()
    transcript = startRecognition()
    return jsonify(transcript = transcript)

@app.post("/startChoreography")
def startChoreography():
    if(currentOS == "Linux"):
        global process_choreo
        process_choreo = Process(target=choreography)
        process_choreo.start()
        #choreography()
        return jsonify(response = "Done")
    else:
        return jsonify(response = "Sorry, use Linux to run this command :(")

@app.post("/stopChoreography")
def stopChoreography():
    if(currentOS == "Linux"):
        global process_choreo
        kill(process_choreo.pid, SIGKILL)
        return jsonify(response = "Done")
    else:
        return jsonify(response = "Sorry, use Linux to run this command :(")

if __name__ == '__main__':
    app.run(host="localhost", port=5000)