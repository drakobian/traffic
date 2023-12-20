import { TrafficLight } from './TrafficLight';
import { Color } from './Color.enum';

const light = new TrafficLight();
console.log(light.forwardLight);
light.forwardLight = Color.Green;
console.log(light.forwardLight);