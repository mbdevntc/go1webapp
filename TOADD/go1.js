"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Go1 = exports.Go1Mode = void 0;
const go1_mqtt_1 = require("./go1-mqtt");
var Go1Mode;
(function (Go1Mode) {
    Go1Mode["dance1"] = "dance1";
    Go1Mode["dance2"] = "dance2";
    Go1Mode["straightHand1"] = "straightHand1";
    Go1Mode["damping"] = "damping";
    Go1Mode["standUp"] = "standUp";
    Go1Mode["standDown"] = "standDown";
    Go1Mode["recoverStand"] = "recoverStand";
    Go1Mode["stand"] = "stand";
    Go1Mode["walk"] = "walk";
    Go1Mode["run"] = "run";
    Go1Mode["climb"] = "climb";
})(Go1Mode = exports.Go1Mode || (exports.Go1Mode = {}));
class Go1 {
    constructor() {
        /**
         * Move forward based on speed and time
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.goForward = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, 0, 0, speed);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Move backward based on speed and time
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.goBackward = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, 0, 0, speed * -1.0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Move left based on speed and time
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.goLeft = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(speed * -1, 0, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Move right based on speed and time
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.goRight = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(speed, 0, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         *
         * Go left/right, turn left/right, and go forward/backward based on speed and time
         *
         * @param leftRightSpeed - A value from -1 to 1
         * @param turnLeftRightSpeed - A value from -1 to 1
         * @param backwardForwardSpeed - A value from -1 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.go = (leftRightSpeed, turnLeftRightSpeed, backwardForwardSpeed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(leftRightSpeed, turnLeftRightSpeed, 0, backwardForwardSpeed);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Rotate left based on speed and time
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.turnLeft = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, speed * -1, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Rotate right based on speed and time
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.turnRight = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, speed, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Extend up - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.extendUp = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, 0, 0, speed);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Squat up - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.squatDown = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, 0, 0, speed * -1);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Leans body to the left - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.leanLeft = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(speed * -1, 0, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Leans body to the right - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.leanRight = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(speed, 0, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Twists body to the left - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.twistLeft = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, speed * -1, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Twists body to the right - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.twistRight = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, speed, 0, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Leans body down - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.lookDown = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, 0, speed * -1, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
        /**
         * Leans body up - requires setMode(Go1Mode.stand) to be set
         *
         * @param speed - A value from 0 to 1
         * @param lengthOfTime - Length of time for movement in milliseconds
         */
        this.lookUp = (speed, lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            this.mqtt.updateSpeed(0, 0, speed, 0);
            yield this.mqtt.sendMovementCommand(lengthOfTime);
        });
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
        /**
         * Wait for a period of time
         *
         * @param lengthOfTime - Length of time for wait in milliseconds
         */
        this.wait = (lengthOfTime) => {
            return new Promise((resolve) => setTimeout(resolve, lengthOfTime));
        };
        /**
         * Change Go1's LED color
         *
         * @param r - A red value from 0 to 255
         * @param g - A green value from 0 to 255
         * @param b - A blue value from 0 to 255
         */
        this.setLedColor = (r, g, b) => {
            this.mqtt.sendLEDCommand(r, g, b);
        };
        /**
         * Set Go1's operation mode
         *
         * @param mode
         * Go1Mode.dance1
         * Go1Mode.dance2
         * Go1Mode.straightHand1
         * Go1Mode.damping
         * Go1Mode.standUp,
         * Go1Mode.standDown
         * Go1Mode.recoverStand
         * Go1Mode.stand
         * Go1Mode.walk
         * Go1Mode.run
         * Go1Mode.climb
         */
        this.setMode = (mode) => {
            this.currentMode = mode
            this.mqtt.sendModeCommand(mode);
        };
        this.mqtt = new go1_mqtt_1.Go1MQTT();
        this.mqtt.connect();
    }
}
exports.Go1 = Go1;
/**
 * stand
 * 0, 0, 0, 1 = stand tall (W)
 * 0, 0, 0, -1 = stand short (S)
 *
 * -1, 0, 0, 0 - tilt left (A)
 * 1, 0, 0, 0 - tilt right (D)
 *
 * 0, -1, 0, 0 - look left (left arrow)
 * 0, 1, 0, 0 - look right (right arrow)
 *
 * 0, 0, -1, 0 - look down (up arrow)
 * 0, 0, 1, 0 - look up (down arrow)
 */
