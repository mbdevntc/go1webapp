// Code to add to go1.js

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



// Code to add to go1.d.ts

/**
     *
     * Lean left/right, twist left/right, and look up/down based on speed and time
     *
     * @param leanLR - A value from -1 to 1
     * @param twistLR - A value from -1 to 1
     * @param lookUpDown - A value from -1 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
//incline: (leanLR: number, twistLR: number, lookUpDown: number, lengthOfTime: number) => Promise<void>; // ------- this line mist be uncommmented -------

// Code to add to go1-mqtt.js

this.client.on("disconnect", () => {
    console.log("disconnected");
    this.connected = false;
});

this.client.on("offline", () => {
    console.log("disconnected");
    this.connected = false;
});