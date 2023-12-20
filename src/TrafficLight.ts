import { Color } from './Color.enum';

export class TrafficLight {
    private _forwardLight: Color;
    private _leftLight: Color;

    constructor() {
        this._forwardLight = Color.Red;
        this._leftLight = Color.Red;
    }

    public get forwardLight() {
        return this._forwardLight;
    }

    public set forwardLight(lightColor: Color) {
        // todo: should this be responsible for guaranteeing flow of
        // light colors? e.g if asking to change to Red, should have been yellow before hmm

        this._forwardLight = lightColor;
    }

    public get leftLight() {
        return this._leftLight;
    }

    public set leftLight(lightColor: Color) {
        this._leftLight = lightColor;
    }

    public toString() {
        return `Left: ${this._leftLight}, Forward: ${this._forwardLight}`;
    }
}