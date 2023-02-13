export const moveAPI = async (leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time) => {
    // Formattazione dei dati in JSON
    const data = JSON.stringify({ leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time })
    try {
        // Invio dei dati e attesa della risposta del server
        const res = await fetch("http://localhost:4001/move", {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: data
        })
        return res
    } catch(e) {
        console.log(e)
    }
}

export const inclineAPI = async (leanLR, twistLR, lookUpDown, time) => {
    // Formattazione dei dati in JSON
    const data = JSON.stringify({ leanLR, twistLR, lookUpDown, time })
    try {
        // Invio dei dati e attesa della risposta del server
        const res = await fetch("http://localhost:4001/incline", {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: data
        })
        return res
    } catch(e) {
        console.log(e)
    }
}

const actions = {
    move: ["muov", "vai", "spost", "indietreggia", "avanza", "ferm", "stop"],
    rotate: ["ruot", "gir"],
    incline: ["pieg", "inclin", "guard", "sied"],
    mode: ["modalità", "alzat", "abbass", "salut"]
}

const directions = {
    move: {
        goForward: {
            words: ["avanti", "avanza"],
            func: ["Il cane va avanti", "move", 0, 0, 1]
        }, 
        goBackward: {
            words: ["indietro", "indietreggia"],
            func: ["Il cane va indietro", "move", 0, 0, -1]
        },
        goLeft: {
            words: ["sinistra"],
            func: ["Il cane va a sinistra", "move", -1, 0, 0]
        },
        goRight: {
            words: ["destra"],
            func: ["Il cane va a destra", "move", 1, 0, 0]
        },
        stop: {
            words: ["fermo", "fermati", "stop"],
            func: ["Il cane si ferma", "move", 0, 0, 0]
        }
    },
    rotate: {
        turnLeft: {
            words: ["sinistra"],
            func: ["Il cane ruota a sinistra", "move", 0, -1, 0]
        },
        turnRight: {
            words: ["destra"],
            func: ["Il cane ruota a destra", "move", 0, 1, 0]
        },
    },
    incline: {
        inclineForward: {
            words: ["avanti", "basso", "giù"],
            func: ["Il cane si inclina in avanti", "incline", 0, 0, 1]
        },
        inclineBackward: {
            words: ["alto", "indietro", "sied", "su"],
            func: ["Il cane si inclina indietro", "incline", 0, 0, -1]
        },
        inclineLeft: {
            words: ["sinistra"],
            func: ["Il cane si inclina a sinstra", "incline", -1, 0, 0]
        },
        inclineRight: {
            words: ["destra"],
            func: ["Il cane si inclina a destra", "incline", 1, 0, 0]
        },
    },
    mode: {
        walk: {
            words: ["camminata", "walk"],
            func: ["Il cane passa in modalità Walk", "mode", "walk"]
        },
        standUp: {
            words: ["alzati", "stand up"],
            func: ["Il cane passa in modalità Stand Up", "mode", "standUp"]
        },
        lieDown: {
            words: ["abbassati", "lie down", "stand down"],
            func: ["Il cane passa in modalità Stand Down", "mode", "standDown"]
        },
        stand: {
            words: ["stand"],
            func: ["Il cane passa in modalità Stand", "mode", "stand"]
        },
        damping: {
            words: ["damping", "dumping"],
            func: ["Il cane passa in modalità Damping", "mode", "damping"]
        },
        climb: {
            words: ["scalata", "climb"],
            func: ["Il cane passa in modalità Climb", "mode", "climb"]
        },
        run: {
            words: ["corsa", "run"],
            func: ["Il cane passa in modalità Run", "mode", "run"]
        },
        dance1: {
            words: ["danza uno", "danza 1", "dance 1"],
            func: ["Il cane passa in modalità Dance 1", "mode", "dance1"]
        },
        dance2: {
            words: ["danza due","danza 2", "dance 2"],
            func: ["Il cane passa in modalità dance2", "mode", "dance2"]
        },
        cheers: {
            words: ["saluta", "cheers"],
            func: ["Il cane passa in modalità Cheers", "mode", "cheers"]
        },
        recoverStand: {
            words: ["recupero", "recover stand"],
            func: ["Il cane passa in modalità Recover Stand", "mode", "recoverStand"]
        },
    }
}

const areIncluded = (arrayOfWords, wordsToSearch) => {
    let result = false
    for(let word of wordsToSearch) {
        if(arrayOfWords.includes(word)) {
            result = true
            break
        }
    }
    return result
}

const lowerize = string => {
    return string.toLowerCase()
}

const getActionType = text => {
    for(let action in actions) {
        if(areIncluded(text, actions[action])) {
            return action
        }
    }
}

export const getCommand = text => {
    text = lowerize(text)
    const action = getActionType(text)
    for(let direction in directions[action]) {
        if(areIncluded(text, directions[action][direction].words)) {
            return directions[action][direction].func
        }
    }
    return ["Comando non riconosciuto", "doNothing"]
}