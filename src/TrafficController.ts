import { Color } from "./Color.enum";
import { TrafficLight } from "./TrafficLight";

enum Direction {
    N,
    S,
    E,
    W
}

export class TrafficController {
    //todo: refactor - I really don't need this map/it's proving to me more
    // cumbersome than helpful
    private _trafficLights: Map<Direction, TrafficLight>;

    // for now: 0 = NS lights, 1 = EW lights
    private _lightPair = 0;

    constructor() {
        const trafficLights = new Map();
        trafficLights.set(Direction.N, new TrafficLight());
        trafficLights.set(Direction.S, new TrafficLight());
        trafficLights.set(Direction.E, new TrafficLight());
        trafficLights.set(Direction.W, new TrafficLight());

        this._trafficLights = trafficLights;
    }

    public run() {
        const northLight = this._trafficLights.get(Direction.N)!!;
        const southLight = this._trafficLights.get(Direction.S)!!;
        const eastLight = this._trafficLights.get(Direction.E)!!;
        const westLight = this._trafficLights.get(Direction.W)!!;

        // bah right. I should write a function that will get called once,
        // and then also get set to repeat in the interval :p
        northLight.forwardLight = Color.Green;
        southLight.forwardLight = Color.Green;

        setTimeout(() => {
                northLight.forwardLight = Color.Yellow;
                southLight.forwardLight = Color.Yellow;
        }, 26000);

        setTimeout(() => {
                northLight.forwardLight = Color.Red;
                southLight.forwardLight = Color.Red;

            this._lightPair = (this._lightPair + 1) % 2;
        }, 28000);

        setInterval(() => {
            if (this._lightPair === 0) {
                northLight.forwardLight = Color.Green;
                southLight.forwardLight = Color.Green;
                eastLight.forwardLight = Color.Red;
                westLight.forwardLight = Color.Red;
            } else {
                northLight.forwardLight = Color.Red;
                southLight.forwardLight = Color.Red;
                eastLight.forwardLight = Color.Green;
                westLight.forwardLight = Color.Green;
            }

            setTimeout(() => {
                if (this._lightPair === 0) {
                    northLight.forwardLight = Color.Yellow;
                    southLight.forwardLight = Color.Yellow;
                } else {
                    eastLight.forwardLight = Color.Yellow;
                    westLight.forwardLight = Color.Yellow;
                }
            }, 26000);

            setTimeout(() => {
                if (this._lightPair === 0) {
                    northLight.forwardLight = Color.Red;
                    southLight.forwardLight = Color.Red;
                } else {
                    eastLight.forwardLight = Color.Red;
                    westLight.forwardLight = Color.Red;
                }

                this._lightPair = (this._lightPair + 1) % 2;
            }, 28000);

        }, 30000);
    }

    public get trafficLights() {
        return `
                        North: ${this._trafficLights.get(Direction.N)}

        West: ${this._trafficLights.get(Direction.W)}       East: ${this._trafficLights.get(Direction.E)}
                
                        South: ${this._trafficLights.get(Direction.S)}
        `;
    }
}