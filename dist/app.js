"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_enum_1 = require("./Color.enum");
const TrafficController_1 = require("./TrafficController");
const chalk_1 = __importDefault(require("chalk"));
const controller = new TrafficController_1.TrafficController;
controller.run();
let tick = true;
setInterval(() => {
    // trick to clear console - any better way to do this?
    console.log("\x1B[2J");
    displayTrafficLights(controller.trafficLights, tick);
    tick = !tick;
}, 500);
const displayTrafficLights = (trafficLights, tick) => {
    console.log(`
                    ${displayTrafficLight(trafficLights[0], tick)}

         ${displayTrafficLight(trafficLights[2], tick)}                 ${displayTrafficLight(trafficLights[3], tick)}
                
                    ${displayTrafficLight(trafficLights[1], tick)}
         `);
};
const displayTrafficLight = (trafficLight, tick) => {
    const leftArrowFlash = tick ? chalk_1.default.black : chalk_1.default.hex('#FFA500');
    return trafficLight.toString()
        .replace(",", "")
        .replace(`Left: ${Color_enum_1.Color.Red}`, chalk_1.default.red('⬅'))
        .replace(`Left: ${Color_enum_1.Color.Orange}`, leftArrowFlash('⬅'))
        .replace(`Left: ${Color_enum_1.Color.Yellow}`, chalk_1.default.yellow('⬅'))
        .replace(`Left: ${Color_enum_1.Color.Green}`, chalk_1.default.green('⬅'))
        .replace(`Forward: ${Color_enum_1.Color.Green}`, '🟢')
        .replace(`Forward: ${Color_enum_1.Color.Yellow}`, '🟡')
        .replace(`Forward: ${Color_enum_1.Color.Red}`, '🔴');
};
