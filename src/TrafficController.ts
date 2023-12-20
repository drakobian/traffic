import { TrafficLight } from "./TrafficLight";

enum Direction {
    N,
    S,
    E,
    W
}
export class TrafficController {
    private _trafficLights: Map<Direction, TrafficLight>;

    constructor() {
        const trafficLights = new Map();
        trafficLights.set(Direction.S, new TrafficLight());
        trafficLights.set(Direction.N, new TrafficLight());
        trafficLights.set(Direction.E, new TrafficLight());
        trafficLights.set(Direction.W, new TrafficLight());

        this._trafficLights = trafficLights;
    }

    public get trafficLights() {
        return `
                        North: ${this._trafficLights.get(Direction.N)}

        West: ${this._trafficLights.get(Direction.W)}       East: ${this._trafficLights.get(Direction.E)}
                
                        South: ${this._trafficLights.get(Direction.S)}
        `;
    }
}