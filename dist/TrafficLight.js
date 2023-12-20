"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficLight = void 0;
const Color_enum_1 = require("./Color.enum");
class TrafficLight {
    constructor() {
        this._forwardLight = Color_enum_1.Color.Red;
        this._leftLight = Color_enum_1.Color.Red;
    }
    get forwardLight() {
        return this._forwardLight;
    }
    set forwardLight(lightColor) {
        // todo: should this be responsible for guaranteeing flow of
        // light colors? e.g if asking to change to Red, should have been yellow before hmm
        this._forwardLight = lightColor;
    }
    get leftLight() {
        return this._leftLight;
    }
    set leftLight(lightColor) {
        this._leftLight = lightColor;
    }
}
exports.TrafficLight = TrafficLight;
