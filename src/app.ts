import { Color } from './Color.enum';
import { TrafficController } from './TrafficController';
import { TrafficLight } from './TrafficLight';
import chalk from 'chalk';

const controller = new TrafficController;
controller.run();

let tick = true;
setInterval(() => {
    // trick to clear console - any better way to do this?
    console.log("\x1B[2J");

    displayTrafficLights(controller.trafficLights, tick);
    tick = !tick;
}, 500);

const displayTrafficLights = (trafficLights: TrafficLight[], tick: boolean) => {
    // really just to show time is passing/the program is running :p 
    const indicator = tick ? '◐' : '◑'
    console.log(
    `
                    ${displayTrafficLight(trafficLights[0], tick)}

         ${displayTrafficLight(trafficLights[2], tick)}         ${indicator}        ${displayTrafficLight(trafficLights[3], tick)}
                
                    ${displayTrafficLight(trafficLights[1], tick)}
         `);
}

const displayTrafficLight = (trafficLight: TrafficLight, tick: boolean): String => {
    const leftArrowFlash = tick ? chalk.black : chalk.hex('#FFA500');

    let withSymbols = trafficLight.toString()
        .replace(",", "")
        .replace(`Left: ${Color.Red}`, chalk.red('⬅'))
        .replace(`Left: ${Color.Orange}`,leftArrowFlash('⬅'))
        .replace(`Left: ${Color.Yellow}`, chalk.yellow('⬅'))
        .replace(`Left: ${Color.Green}`, chalk.green('⬅'))
        .replace(`Forward: ${Color.Green}`, '🟢')
        .replace(`Forward: ${Color.Yellow}`, '🟡')
        .replace(`Forward: ${Color.Red}`, '🔴');

    return withSymbols;
}