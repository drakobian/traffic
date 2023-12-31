"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficController = void 0;
const Color_enum_1 = require("./Color.enum");
const TrafficLight_1 = require("./TrafficLight");
class TrafficController {
    constructor() {
        // for now: 0 = NS lights, 1 = EW lights
        this._lightPair = 0;
        this._trafficLights = [
            new TrafficLight_1.TrafficLight(),
            new TrafficLight_1.TrafficLight(),
            new TrafficLight_1.TrafficLight(),
            new TrafficLight_1.TrafficLight()
        ];
    }
    run() {
        const timeScale = 1;
        const totalInterval = 30000;
        setInterval(() => this.switchLights(totalInterval, timeScale), totalInterval * timeScale);
        this.switchLights(totalInterval, timeScale);
    }
    switchLights(totalInterval, timeScale) {
        const northLight = this._trafficLights[0];
        const southLight = this._trafficLights[1];
        const eastLight = this._trafficLights[2];
        const westLight = this._trafficLights[3];
        this._trafficLights.forEach(trafficLight => {
            trafficLight.leftLight = Color_enum_1.Color.Red;
            trafficLight.forwardLight = Color_enum_1.Color.Red;
        });
        let [firstLight, secondLight] = this._lightPair === 0 ? [northLight, southLight] : [eastLight, westLight];
        firstLight.leftLight = Color_enum_1.Color.Green;
        secondLight.leftLight = Color_enum_1.Color.Green;
        setTimeout(() => {
            firstLight.leftLight = Color_enum_1.Color.Yellow;
            secondLight.leftLight = Color_enum_1.Color.Yellow;
        }, (totalInterval - 25000) * timeScale);
        setTimeout(() => {
            firstLight.leftLight = Color_enum_1.Color.Red;
            secondLight.leftLight = Color_enum_1.Color.Red;
        }, (totalInterval - 23000) * timeScale);
        setTimeout(() => {
            firstLight.forwardLight = Color_enum_1.Color.Green;
            firstLight.leftLight = Color_enum_1.Color.Orange;
            secondLight.forwardLight = Color_enum_1.Color.Green;
            secondLight.leftLight = Color_enum_1.Color.Orange;
        }, (totalInterval - 21000) * timeScale);
        setTimeout(() => {
            this.setLeftAndForwardLights(firstLight, Color_enum_1.Color.Yellow);
            this.setLeftAndForwardLights(secondLight, Color_enum_1.Color.Yellow);
        }, (totalInterval - 4000) * timeScale);
        setTimeout(() => {
            this.setLeftAndForwardLights(firstLight, Color_enum_1.Color.Red);
            this.setLeftAndForwardLights(secondLight, Color_enum_1.Color.Red);
            this._lightPair = (this._lightPair + 1) % 2;
        }, (totalInterval - 2000) * timeScale);
    }
    get trafficLights() {
        return this._trafficLights;
    }
    setLeftAndForwardLights(light, color) {
        light.forwardLight = color;
        light.leftLight = color;
    }
}
exports.TrafficController = TrafficController;
