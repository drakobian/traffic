"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrafficController_1 = require("./TrafficController");
const controller = new TrafficController_1.TrafficController;
controller.run();
setInterval(() => {
    console.log(controller.trafficLights);
}, 1000);
