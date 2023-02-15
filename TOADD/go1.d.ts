import { Go1MQTT } from "./go1-mqtt";
export declare enum Go1Mode {
    dance1 = "dance1",
    dance2 = "dance2",
    straightHand1 = "straightHand1",
    damping = "damping",
    standUp = "standUp",
    standDown = "standDown",
    recoverStand = "recoverStand",
    stand = "stand",
    walk = "walk",
    run = "run",
    climb = "climb"
}
export declare class Go1 {
    mqtt: Go1MQTT;
    constructor();
    /**
     * Move forward based on speed and time
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    goForward: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Move backward based on speed and time
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    goBackward: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Move left based on speed and time
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    goLeft: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Move right based on speed and time
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    goRight: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     *
     * Go left/right, turn left/right, and go forward/backward based on speed and time
     *
     * @param leftRightSpeed - A value from -1 to 1
     * @param turnLeftRightSpeed - A value from -1 to 1
     * @param backwardForwardSpeed - A value from -1 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    go: (leftRightSpeed: number, turnLeftRightSpeed: number, backwardForwardSpeed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Rotate left based on speed and time
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    turnLeft: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Rotate right based on speed and time
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    turnRight: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Extend up - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    extendUp: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Squat up - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    squatDown: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Leans body to the left - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    leanLeft: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Leans body to the right - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    leanRight: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Twists body to the left - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    twistLeft: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Twists body to the right - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    twistRight: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Leans body down - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    lookDown: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     * Leans body up - requires setMode(Go1Mode.stand) to be set
     *
     * @param speed - A value from 0 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    lookUp: (speed: number, lengthOfTime: number) => Promise<void>;
    /**
     *
     * Lean left/right, twist left/right, and look up/down based on speed and time
     *
     * @param leanLR - A value from -1 to 1
     * @param twistLR - A value from -1 to 1
     * @param lookUpDown - A value from -1 to 1
     * @param lengthOfTime - Length of time for movement in milliseconds
     */
    incline: (leanLR: number, twistLR: number, lookUpDown: number, lengthOfTime: number) => Promise<void>;
    /**
     * Wait for a period of time
     *
     * @param lengthOfTime - Length of time for wait in milliseconds
     */
    wait: (lengthOfTime: number) => Promise<unknown>;
    /**
     * Change Go1's LED color
     *
     * @param r - A red value from 0 to 255
     * @param g - A green value from 0 to 255
     * @param b - A blue value from 0 to 255
     */
    setLedColor: (r: number, g: number, b: number) => void;
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
    setMode: (mode: Go1Mode) => void;
}
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
