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
        const timeScale = 1;
        const totalInterval = 30000;

        setInterval(() => this.switchLights(totalInterval, timeScale), totalInterval * timeScale);
        this.switchLights(totalInterval, timeScale);
    }

    private switchLights(totalInterval: number, timeScale: number) {
        const northLight = this._trafficLights[0];
        const southLight = this._trafficLights[1];
        const eastLight = this._trafficLights[2];
        const westLight = this._trafficLights[3];

        let [firstLight, secondLight] = this._lightPair === 0 ? [northLight, southLight] : [eastLight, westLight];
        if (this._lightPair === 0) {
            // set NS left lights to green,
            // all other lights to red
            northLight.leftLight = Color.Green;
            southLight.leftLight = Color.Green;
            northLight.forwardLight = Color.Red;
            southLight.forwardLight = Color.Red;
            eastLight.forwardLight = Color.Red;
            westLight.forwardLight = Color.Red;
            eastLight.leftLight = Color.Red;
            westLight.leftLight = Color.Red;
            //setNorthSouthLeftLights.bind(this, Color.Green);
        } else {
            // set EW left lights to green
            // all other lights to red
            northLight.leftLight = Color.Red;
            southLight.leftLight = Color.Red;
            northLight.forwardLight = Color.Red;
            southLight.forwardLight = Color.Red;
            eastLight.forwardLight = Color.Red;
            westLight.forwardLight = Color.Red;
            eastLight.leftLight = Color.Green;
            westLight.leftLight = Color.Green;
        }

        // todo: work these out as proportions!
        // set left lights to yellow after 5 seconds (totalInterval time - 25000 in this case...)
        setTimeout(() => {
            firstLight.leftLight = Color.Yellow;
            secondLight.leftLight = Color.Yellow;
        }, (totalInterval - 25000) * timeScale);

        // set lefts to red 2 seconds after that (7 seconds total, for now that's -23000)
        setTimeout(() => {
            firstLight.leftLight = Color.Red;
            secondLight.leftLight = Color.Red;
        }, (totalInterval - 23000) * timeScale);

        // set lights to green and lefts to orange after 9 total seconds? (21000)
        setTimeout(() => {
            firstLight.forwardLight = Color.Green;
            firstLight.leftLight = Color.Orange;

            secondLight.forwardLight = Color.Green;
            secondLight.leftLight = Color.Orange;
        }, (totalInterval - 21000) * timeScale);

        setTimeout(() => {
            this.setLeftAndForwardLights(firstLight, Color.Yellow);
            this.setLeftAndForwardLights(secondLight, Color.Yellow);
        }, (totalInterval - 4000) * timeScale);

        setTimeout(() => {
            this.setLeftAndForwardLights(firstLight, Color.Red);
            this.setLeftAndForwardLights(secondLight, Color.Red);

            this._lightPair = (this._lightPair + 1) % 2;
        }, (totalInterval - 2000) * timeScale);
    }

    public get trafficLights() {
        return this._trafficLights;
    }

    private setLeftAndForwardLights(light: TrafficLight, color: Color) {
        light.forwardLight = color;
        light.leftLight = color;
    }
}
