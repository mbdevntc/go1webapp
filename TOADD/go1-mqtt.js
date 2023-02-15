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
exports.Go1MQTT = void 0;
const mqtt = require("mqtt");
class Go1MQTT {
    constructor() {
        this.floats = new Float32Array(4);
        this.endpoint = "mqtt://192.168.12.1";
        this.connected = false;
        this.connect = () => {
            console.log("connecting");
            this.client = mqtt.connect(this.endpoint, {
                clientId: Math.random().toString(16).substring(2, 8),
                keepalive: 5,
            });
            this.client.on("connect", () => {
                console.log("connected");
                this.connected = true;
            });
            this.client.on("disconnect", () => {
                console.log("disconnected");
                this.connected = false;
            });
            this.client.on("offline", () => {
                console.log("disconnected");
                this.connected = false;
            });
        };
        this.updateSpeed = (leftRight, turnLeftRight, lookUpDown, // Only for stand mode
        backwardForward) => {
            this.floats[0] = this.clamp(leftRight);
            this.floats[1] = this.clamp(turnLeftRight);
            this.floats[2] = this.clamp(lookUpDown);
            this.floats[3] = this.clamp(backwardForward);
        };
        this.sendMovementCommand = (lengthOfTime) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let interval;
            let zero = new Float32Array(4);
            zero[0] = 0;
            zero[1] = 0;
            zero[2] = 0;
            zero[3] = 0;
            // Reset speed from the buffer for a few
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.publish(this.movementTopic, new Uint8Array(zero.buffer), {
                qos: 0,
            });
            interval = setInterval(() => {
                var _a;
                console.log(`sending command ${this.floats}`);
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.publish(this.movementTopic, new Uint8Array(this.floats.buffer), {
                    qos: 0,
                });
            }, this.publishFrequency);
            // Stop sending after lengthOfTime
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    clearInterval(interval);
                }, lengthOfTime);
            });
        });
        this.sendLEDCommand = (r, g, b) => {
            var _a;
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.publish(this.ledTopic, `child_conn.send('change_light(${r},${g},${b})')`, {
                qos: 0,
            });
        };
        this.sendModeCommand = (mode) => {
            var _a;
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.publish(this.modeTopic, mode, {
                qos: 1,
            });
        };
        this.clamp = (speed) => {
            if (speed < -1.0) {
                return -1.0;
            }
            else if (speed > 1.0) {
                return 1.0;
            }
            else {
                return speed;
            }
        };
        this.client = null;
        this.floats[0] = 0; // walk left (neg) and right (pos)
        this.floats[1] = 0; // turn left (neg) and  right (pos)
        this.floats[2] = 0;
        this.floats[3] = 0; // walk backward (neg) and forward (pos)
        this.movementTopic = "controller/stick";
        this.ledTopic = "programming/code";
        this.modeTopic = "controller/action";
        this.publishFrequency = 100; // Send MQTT message every 100ms
    }
}
exports.Go1MQTT = Go1MQTT;
