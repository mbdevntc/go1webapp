if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

/* 
Aggiungere il seguente codice al file go1-mqtt.js per verificare quando il cane si disconnette:

CODE:
#######
this.client.on("disconnect", () => {
    console.log("disconnected");
    this.connected = false;
});

this.client.on("offline", () => {
    console.log("disconnected");
    this.connected = false;
});
#######

*/

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Go1 = require('@droneblocks/go1-js').Go1

app.use(cors())
app.use(bodyParser.json())

const robot = new Go1()
robot.setMode("standUp")

app.get('/isConnected', async (req, res, next) => {
    if(robot.mqtt.connected) {
        res.status(200).json({ connected: true })
    } else {
        res.status(200).json({ connected: false })
    }
})

// app.get('/mode', async (req, res, next) => {
//     if(robot.mqtt.connected) {
//         const mode = robot.getMode()
//         res.status(200).json({ mode })  
//     } else {
//         const error = new Error('Cane robot non connesso')
//         error.status = 404
//         return next(error);
//     }
// })

app.post('/mode', async (req, res, next) => {
    if(robot.mqtt.connected) {
        const { mode } = await req.body
        robot.setMode(mode)
        res.status(200).send("done")
        
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.post('/move', async (req, res, next) => {
    if(robot.mqtt.connected) {
        robot.setMode("walk")
        const { leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time } = await req.body
        await robot.go(leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time)
        res.status(200).send("done")
        
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.post('/incline', async (req, res, next) => {
    if(robot.mqtt.connected) {
        robot.setMode("stand")
        const { leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time } = await req.body
        await robot.go(leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time)
        res.status(200).send("done")
        
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.post('/lookUp', async (req, res, next) => {
    if(robot.mqtt.connected) {
        robot.setMode("stand")
        const { speed, time } = await req.body
        await robot.lookUp(speed, time)
        res.status(200).send("done")
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.post('/lookDown', async (req, res, next) => {
    if(robot.mqtt.connected) {
        robot.setMode("stand")
        const { speed, time } = await req.body
        await robot.lookDown(speed, time)
        res.status(200).send("done")
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.post('/leanLeft', async (req, res, next) => {
    if(robot.mqtt.connected) {
        robot.setMode("stand")
        const { speed, time } = await req.body
        await robot.leanLeft(speed, time)
        res.status(200).send("done")
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.post('/leanRight', async (req, res, next) => {
    if(robot.mqtt.connected) {
        robot.setMode("stand")
        const { speed, time } = await req.body
        await robot.leanRight(speed, time)
        res.status(200).send("done")
    } else {
        const error = new Error('Cane robot non connesso')
        error.status = 404
        return next(error);
    }
})

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    console.log(err.message)
    res.status(errorStatus).send(err.message);
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on port ${process.env.SERVER_PORT}` )
})