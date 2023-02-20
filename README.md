# Unitree Go1 - Application

Web application to control Unitree Go1 robot.

## Warning

Some functions needs to be included in the @droneblocks/go1-js library for the correct function of the app.
These functions are defined in toAdd.js as like as the instructions to add them.

## Starting the project

### `npm start` 
Runs the web app in development mode

### `nodemon server/server.cjs`
Runs the Javascript server. This server is used to send the instructions to Go1.

### `python server/python/app.py`
Runs the Python server. This server is used for offline speech recognition.

### `npm run build` 
Creates a production build of the app.

## Tip:

Copy the build directory into the server directory. Start both the JS server and the Python server.
Your app is served at http://localhost:4001/