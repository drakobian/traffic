"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrafficLight_1 = require("./TrafficLight");
const Color_enum_1 = require("./Color.enum");
console.log("Good luck, Drake!");
const light = new TrafficLight_1.TrafficLight();
console.log(light.forwardLight);
console.log(light.forwardLight = Color_enum_1.Color.Green);
console.log(light.forwardLight);
