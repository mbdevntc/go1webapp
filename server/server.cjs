if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const Go1 = require('@droneblocks/go1-js').Go1
// import { Go1 } from '@droneblocks/go1-js';

const robot = new Go1()

app.post('/goForward', async (req, res) => {
    robot.setMode("walk")
    console.log("move forward")
    await robot.goBackward(0.25, 1000)
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
