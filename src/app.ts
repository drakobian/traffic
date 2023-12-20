import { TrafficController } from './TrafficController';

const controller = new TrafficController;
controller.run();

setInterval(() => {
    console.log(controller.trafficLights);
}, 1000);