// @ts-nocheck
import World from './world';
import CanvasScreen from './canvas-screen';
import ConsoleScreen from './console-screen';
import {isBrowser} from '../utils';

export default class Game {
  constructor(config) {
    this._world = World.create(config);
    this._screen = isBrowser()
      ? CanvasScreen.create(this._world, config.rootElement)
      : ConsoleScreen.create(this._world);
  }

  start() {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep() {
    this._world.recount();
    this._screen.print();
  }

  static create(config) {
    return new Game(config);
  }
}
