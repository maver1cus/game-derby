import World from '../engine/world/world';
import {Config} from '../types';
import IScreen from '../engine/console-screen/screen.interface';
import {isBrowser} from './common';
// import CanvasScreen from '../engine/canvas-screen/canvas-screen';
import ConsoleScreen from '../engine/console-screen/console-screen';
import DomScreen from '../engine/dom-screen/dom-screen';

export const createScreen = (world: World, config: Config): IScreen => {
  return isBrowser()
    ? new DomScreen(world, config)
    : new ConsoleScreen(world);
}
