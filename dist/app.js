"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TrafficController_1 = require("./TrafficController");
const chalk_1 = __importDefault(require("chalk"));
const controller = new TrafficController_1.TrafficController;
controller.run();
setInterval(() => {
    // trick to clear console - any better way to do this?
    console.log("\x1B[2J");
    displayTrafficLights(controller.trafficLights);
}, 1000);
const displayTrafficLights = (trafficLights) => {
    console.log(`
                    ${displayTrafficLight(trafficLights[0])}

         ${displayTrafficLight(trafficLights[2])}                 ${displayTrafficLight(trafficLights[3])}
                
                    ${displayTrafficLight(trafficLights[1])}
         `);
};
const displayTrafficLight = (trafficLight) => {
    return trafficLight.toString()
        .replace(",", "")
        .replace("Left: Red", chalk_1.default.red('⬅'))
        .replace("Left: Yellow", chalk_1.default.yellow('⬅'))
        .replace("Left: Green", chalk_1.default.green('⬅'))
        .replace("Forward: Green", '🟢')
        .replace("Forward: Yellow", '🟡')
        .replace("Forward: Red", '🔴');
};
