import World from '../engine/world/world';
import {Config} from '../types';
import IScreen from '../engine/console-screen/screen.interface';
import {isBrowser} from './common';
import CanvasScreen from '../engine/canvas-screen/canvas-screen';
import ConsoleScreen from '../engine/console-screen/console-screen';

export const createScreen = (world: World, config: Config): IScreen => {
  return isBrowser()
    ? new CanvasScreen(world, config.rootElement)
    : new ConsoleScreen(world);
}
