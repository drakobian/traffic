"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficController = void 0;
const Color_enum_1 = require("./Color.enum");
const TrafficLight_1 = require("./TrafficLight");
var Direction;
(function (Direction) {
    Direction[Direction["N"] = 0] = "N";
    Direction[Direction["S"] = 1] = "S";
    Direction[Direction["E"] = 2] = "E";
    Direction[Direction["W"] = 3] = "W";
})(Direction || (Direction = {}));
class TrafficController {
    constructor() {
        // const trafficLights = new Map();
        // trafficLights.set(Direction.N, new TrafficLight());
        // trafficLights.set(Direction.S, new TrafficLight());
        // trafficLights.set(Direction.E, new TrafficLight());
        // trafficLights.set(Direction.W, new TrafficLight());
        // for now: 0 = NS lights, 1 = EW lights
        this._lightPair = 0;
        // this._trafficLights = trafficLights;
        this._trafficLights = [
            new TrafficLight_1.TrafficLight(),
            new TrafficLight_1.TrafficLight(),
            new TrafficLight_1.TrafficLight(),
            new TrafficLight_1.TrafficLight()
        ];
    }
    run() {
        const timeScale = 0.5;
        const totalInterval = 30000;
        setInterval(() => this.switchLights(timeScale), totalInterval * timeScale);
        this.switchLights(timeScale);
    }
    switchLights(timeScale) {
        const northLight = this._trafficLights[0];
        const southLight = this._trafficLights[1];
        const eastLight = this._trafficLights[2];
        const westLight = this._trafficLights[3];
        if (this._lightPair === 0) {
            northLight.forwardLight = Color_enum_1.Color.Green;
            southLight.forwardLight = Color_enum_1.Color.Green;
            eastLight.forwardLight = Color_enum_1.Color.Red;
            westLight.forwardLight = Color_enum_1.Color.Red;
        }
        else {
            northLight.forwardLight = Color_enum_1.Color.Red;
            southLight.forwardLight = Color_enum_1.Color.Red;
            eastLight.forwardLight = Color_enum_1.Color.Green;
            westLight.forwardLight = Color_enum_1.Color.Green;
        }
        setTimeout(() => {
            if (this._lightPair === 0) {
                northLight.forwardLight = Color_enum_1.Color.Yellow;
                southLight.forwardLight = Color_enum_1.Color.Yellow;
            }
            else {
                eastLight.forwardLight = Color_enum_1.Color.Yellow;
                westLight.forwardLight = Color_enum_1.Color.Yellow;
            }
        }, 26000 * timeScale);
        setTimeout(() => {
            if (this._lightPair === 0) {
                northLight.forwardLight = Color_enum_1.Color.Red;
                southLight.forwardLight = Color_enum_1.Color.Red;
            }
            else {
                eastLight.forwardLight = Color_enum_1.Color.Red;
                westLight.forwardLight = Color_enum_1.Color.Red;
            }
            this._lightPair = (this._lightPair + 1) % 2;
        }, 28000 * timeScale);
    }
    get trafficLights() {
        return this._trafficLights;
        // return `
        //                 ${this._trafficLights.get(Direction.N)}
        // ${this._trafficLights.get(Direction.W)}       ${this._trafficLights.get(Direction.E)}
        //                 ${this._trafficLights.get(Direction.S)}
        // `;
    }
}
exports.TrafficController = TrafficController;
