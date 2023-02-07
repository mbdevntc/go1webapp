from pyttsx3 import init
from speech_recognition import Recognizer, Microphone, UnknownValueError

engine = init()

voices = engine.getProperty("voices")
engine.setProperty("voice", voices[41].id)

r = Recognizer()
err = True
testo = ""

# actions = {
#     "move": ["muov", "vai", "spost", "indietreggia", "avanza", "ferm", "stop"],
#     "rotate": ["ruot", "gir"],
#     "incline": ["pieg", "inclin", "guard", "sied"],
#     "mode": ["modalità", "alzat", "abbass", "salut"]
# }


# directions = {
#     "move": {
#         "goForward": {
#             "words": ["avanti", "avanza"],
#             "func": ["Il cane va avanti", "move", 0, 0, 1]
#         },
#         "goBackward": {
#             "words": ["indietro", "indietreggia"],
#             "func": ["Il cane va indietro", "move", 0, 0, -1]
#         },
#         "goLeft": {
#             "words": ["sinistra"],
#             "func": ["Il cane va a sinistra", "move", -1, 0, 0]
#         },
#         "goRight": {
#             "words": ["destra"],
#             "func": ["Il cane va a destra", "move", 1, 0, 0]
#         },
#         "stop": {
#             "words": ["fermo", "fermati", "stop"],
#             "func": ["Il cane si ferma", "move", 0, 0, 0]
#         }
#     },
#     "rotate": {
#         "turnLeft": {
#             "words": ["sinistra"],
#             "func": ["Il cane ruota a sinistra", "move", 0, -1, 0]
#         },
#         "turnRight": {
#             "words": ["destra"],
#             "func": ["Il cane ruota a destra", "move", 0, 1, 0]
#         },
#     },
#     "incline": {
#         "inclineForward": {
#             "words": ["avanti", "basso", "giù"],
#             "func": ["Il cane si inclina in avanti", "incline", 0, 0, 1]
#         },
#         "inclineBackward": {
#             "words": ["alto", "indietro", "sied", "su"],
#             "func": ["Il cane si inclina indietro", "incline", 0, 0, -1]
#         },
#         "inclineLeft": {
#             "words": ["sinistra"],
#             "func": ["Il cane si inclina a sinstra", "incline", -1, 0, 0]
#         },
#         "inclineRight": {
#             "words": ["destra"],
#             "func": ["Il cane si inclina a destra", "incline", 1, 0, 0]
#         },
#     },
#     "mode": {
#         "walk": {
#             "words": ["camminata", "walk"],
#             "func": ["Il cane passa in modalità Walk", "mode", "walk"]
#         },
#         "standUp": {
#             "words": ["alzati", "stand up"],
#             "func": ["Il cane passa in modalità Stand Up", "mode", "standUp"]
#         },
#         "lieDown": {
#             "words": ["abbassati", "lie down", "stand down"],
#             "func": ["Il cane passa in modalità Stand Down", "mode", "standDown"]
#         },
#         "stand": {
#             "words": ["stand"],
#             "func": ["Il cane passa in modalità Stand", "mode", "stand"]
#         },
#         "damping": {
#             "words": ["damping", "dumping"],
#             "func": ["Il cane passa in modalità Damping", "mode", "damping"]
#         },
#         "climb": {
#             "words": ["scalata", "climb"],
#             "func": ["Il cane passa in modalità Climb", "mode", "climb"]
#         },
#         "run": {
#             "words": ["corsa", "run"],
#             "func": ["Il cane passa in modalità Run", "mode", "run"]
#         },
#         "dance1": {
#             "words": ["danza uno", "danza 1", "dance 1"],
#             "func": ["Il cane passa in modalità Dance 1", "mode", "dance1"]
#         },
#         "dance2": {
#             "words": ["danza due", "danza 2", "dance 2"],
#             "func": ["Il cane passa in modalità dance2", "mode", "dance2"]
#         },
#         "cheers": {
#             "words": ["saluta", "cheers"],
#             "func": ["Il cane passa in modalità Cheers", "mode", "cheers"]
#         },
#         "recoverStand": {
#             "words": ["recupero", "recover stand"],
#             "func": ["Il cane passa in modalità Recover Stand", "mode", "recoverStand"]
#         }
#     }
# }

# def areIncluded(arrayOfWords, wordsToSearch):
#     result = False
#     for word in wordsToSearch:
#         if(word in arrayOfWords):
#             result = True
#             break
#     return result

# def lowerize(string):
#     return string.lower()

# def getActionType(text):
#     for action in actions:
#         if(areIncluded(text, actions[action])):
#             return action

# def getCommand(text):
#     text = lowerize(text)
#     action = getActionType(text)
#     for direction in directions[action]:
#         if areIncluded(text, directions[action][direction]["words"]):
#             return directions[action][direction]["func"]
#     return ["Comando non riconosciuto", "doNothing"]


with Microphone() as source:
    r.adjust_for_ambient_noise(source)
    while(err):
        engine.runAndWait()
        print("pronto ad ascoltare...")
        audio = r.listen(source)
        try:
            testo = r.recognize_google(audio, language="it-IT")
            err = False
        except UnknownValueError:
            print("Errore nell'ascolto")
        finally:
            if(testo):
                testo = testo.lower()
                changeColorOnEmotion(testo)
            else:
                print("Errore")

with Microphone() as source:
    r.adjust_for_ambient_noise(source)
    while(err):
        engine.runAndWait()
        print("pronto ad ascoltare...")
        audio = r.listen(source)
        try:
            testo = r.recognize_google(audio, language="it-IT")
            err = False
        except UnknownValueError:
            print("Errore nell'ascolto")
        finally:
            if(testo):
                testo = testo.lower()
            else:
                print("Errore")