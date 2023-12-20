import { TrafficController } from './TrafficController';
import { TrafficLight } from './TrafficLight';
import chalk from 'chalk';

const controller = new TrafficController;
controller.run();

setInterval(() => {
    // trick to clear console - any better way to do this?
    console.log("\x1B[2J");

    displayTrafficLights(controller.trafficLights);
}, 1000);

const displayTrafficLights = (trafficLights: TrafficLight[]) => {
    console.log(
    `
                    ${displayTrafficLight(trafficLights[0])}

         ${displayTrafficLight(trafficLights[2])}                 ${displayTrafficLight(trafficLights[3])}
                
                    ${displayTrafficLight(trafficLights[1])}
         `);
}

const displayTrafficLight = (trafficLight: TrafficLight): String => {
    return trafficLight.toString()
        .replace(",", "")
        .replace("Left: Red", chalk.red('⬅'))
        .replace("Left: Yellow", chalk.yellow('⬅'))
        .replace("Left: Green", chalk.green('⬅'))
        .replace("Forward: Green", '🟢')
        .replace("Forward: Yellow", '🟡')
        .replace("Forward: Red", '🔴');
}