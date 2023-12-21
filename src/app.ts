import { Color } from './Color.enum';
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
        .replace(`Left: ${Color.Red}`, chalk.red('⬅'))
        .replace(`Left: ${Color.Orange}`, chalk.hex('#FFA500')('⬅'))
        .replace(`Left: ${Color.Yellow}`, chalk.yellow('⬅'))
        .replace(`Left: ${Color.Green}`, chalk.green('⬅'))
        .replace(`Forward: ${Color.Green}`, '🟢')
        .replace(`Forward: ${Color.Yellow}`, '🟡')
        .replace(`Forward: ${Color.Red}`, '🔴');
}