if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Go1 = require('@droneblocks/go1-js').Go1

app.use(cors())
app.use(bodyParser.json())

const robot = new Go1()
robot.setMode("stand")

app.post('/goForward', async (req, res) => {
    console.log("ciao")
    const { speed, time } = await req.body
    robot.setMode("walk")
    console.log("move forward")
    await robot.goForward(speed, time)
    await robot.wait(1000)
    console.log("done")
})

app.post('/goBackward', async (req, res) => {
    console.log("ciao")
    robot.setMode("walk")
    const { speed, time } = await req.body
    console.log("move backward")
    await robot.goBackward(speed, time)
    await robot.wait(1000)
    console.log("done")
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on port ${process.env.SERVER_PORT}` )
})
