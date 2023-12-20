import { Color } from "./Color.enum";
import { TrafficLight } from "./TrafficLight";


export class TrafficController {
    private _trafficLights: TrafficLight[];

    // for now: 0 = NS lights, 1 = EW lights
    private _lightPair = 0;

    constructor() {
        this._trafficLights = [
            new TrafficLight(),
            new TrafficLight(),
            new TrafficLight(),
            new TrafficLight()
        ];
    }

    public run() {
        const timeScale = 0.5;
        const totalInterval = 30000;

        setInterval(() => this.switchLights(timeScale), totalInterval * timeScale);
        this.switchLights(timeScale);
    }

    private switchLights(timeScale: number) {
        const northLight = this._trafficLights[0];
        const southLight = this._trafficLights[1];
        const eastLight = this._trafficLights[2];
        const westLight = this._trafficLights[3];

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
        }, 26000 * timeScale);

        setTimeout(() => {
            if (this._lightPair === 0) {
                northLight.forwardLight = Color.Red;
                southLight.forwardLight = Color.Red;
            } else {
                eastLight.forwardLight = Color.Red;
                westLight.forwardLight = Color.Red;
            }

            this._lightPair = (this._lightPair + 1) % 2;
        }, 28000 * timeScale);
    }

    public get trafficLights() {
        return this._trafficLights;
    }
}