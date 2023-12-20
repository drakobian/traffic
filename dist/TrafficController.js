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
        // for now: 0 = NS lights, 1 = EW lights
        this._lightPair = 0;
        const trafficLights = new Map();
        trafficLights.set(Direction.N, new TrafficLight_1.TrafficLight());
        trafficLights.set(Direction.S, new TrafficLight_1.TrafficLight());
        trafficLights.set(Direction.E, new TrafficLight_1.TrafficLight());
        trafficLights.set(Direction.W, new TrafficLight_1.TrafficLight());
        this._trafficLights = trafficLights;
    }
    run() {
        const northLight = this._trafficLights.get(Direction.N);
        const southLight = this._trafficLights.get(Direction.S);
        const eastLight = this._trafficLights.get(Direction.E);
        const westLight = this._trafficLights.get(Direction.W);
        // bah right. I should write a function that will get called once,
        // and then also get set to repeat in the interval :p
        northLight.forwardLight = Color_enum_1.Color.Green;
        southLight.forwardLight = Color_enum_1.Color.Green;
        setTimeout(() => {
            northLight.forwardLight = Color_enum_1.Color.Yellow;
            southLight.forwardLight = Color_enum_1.Color.Yellow;
        }, 26000);
        setTimeout(() => {
            northLight.forwardLight = Color_enum_1.Color.Red;
            southLight.forwardLight = Color_enum_1.Color.Red;
            this._lightPair = (this._lightPair + 1) % 2;
        }, 28000);
        setInterval(() => {
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
            }, 26000);
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
            }, 28000);
        }, 30000);
        // // todo: any better way to guarantee my light will be defined? !! is fine for a project hopefully :p 
        // this._trafficLights.get(Direction.N)!!.forwardLight = Color.Green;
        // this._trafficLights.get(Direction.S)!!.forwardLight = Color.Green;
        // setInterval(() => {
        //     setTimeout(() => {
        //         this._trafficLights.get(Direction.N)!!.forwardLight = Color.Yellow;
        //         this._trafficLights.get(Direction.S)!!.forwardLight = Color.Yellow;
        //     }, 9000);
        //     setTimeout(() => {
        //         this._trafficLights.get(Direction.N)!!.forwardLight = Color.Red;
        //         this._trafficLights.get(Direction.S)!!.forwardLight = Color.Red;
        //     }, 13000);
        // }, 15000);
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
