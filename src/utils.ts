import CanvasScreen from './engine/canvas-screen/canvas-screen';
import ConsoleScreen from './engine/console-screen/console-screen';
import IScreen from './engine/console-screen/screen.interface';
import World from './engine/world/world';
import {Config} from './types'

export const getRandomInteger = (a= 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export const getRandomItemFromArray = (array: string[]): string => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
}

export const isBrowser = (): boolean => {
  return !!(typeof window != 'undefined' && window.document);
}

export const createScreen = (world: World, config: Config): IScreen => {
  return isBrowser()
    ? new CanvasScreen(world, config.rootElement)
    : new ConsoleScreen(world);
}
