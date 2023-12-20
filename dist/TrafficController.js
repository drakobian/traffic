"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficController = void 0;
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
        const trafficLights = new Map();
        trafficLights.set(Direction.S, new TrafficLight_1.TrafficLight());
        trafficLights.set(Direction.N, new TrafficLight_1.TrafficLight());
        trafficLights.set(Direction.E, new TrafficLight_1.TrafficLight());
        trafficLights.set(Direction.W, new TrafficLight_1.TrafficLight());
        this._trafficLights = trafficLights;
    }
    get trafficLights() {
        return `
                        North: ${this._trafficLights.get(Direction.N)}

        West: ${this._trafficLights.get(Direction.W)}       East: ${this._trafficLights.get(Direction.E)}
                
                        South: ${this._trafficLights.get(Direction.S)}
        `;
    }
}
exports.TrafficController = TrafficController;
