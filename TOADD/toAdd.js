// Code to add to @droneblock/dist/go1.js - insert on line 183

/**
         *
         * Lean left/right, twist left/right, and look up/down based on speed and time
         *
         * @param leanLR - A value from -1 to 1
         * @param twistLR - A value from -1 to 1
         * @param lookUpDown - A value from -1 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
this.incline = (leanLR, twistLR, lookUpDown, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
    this.mqtt.updateSpeed(leanLR, twistLR, lookUpDown, 0);
    yield this.mqtt.sendMovementCommand(lengthOfTime);
});



// Code to add to @droneblock/dist/go1.d.ts - insert on line  126

/**
     *
     * Lean left/right, twist left/right, and look up/down based on speed and time
     *
     * @param leanLR - A value from -1 to 1
     * @param twistLR - A value from -1 to 1
     * @param lookUpDown - A value from -1 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
//incline: (leanLR: number, twistLR: number, lookUpDown: number, lengthOfTime: number) => Promise<void>; // ------- this line must be uncommmented -------

// Code to add to @droneblock/dist/go1-mqtt.js - insert on line 29

this.client.on("disconnect", () => {
    console.log("disconnected");
    this.connected = false;
});

this.client.on("offline", () => {
    console.log("disconnected");
    this.connected = false;
});

// OR JUST COPY AND PASTE THE FILES THAT ARE INCLUDED IN THIS FOLDER :)