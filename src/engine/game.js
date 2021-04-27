import World from './world.js';
import CanvasScreen from './canvas-screen.js';
import ConsoleScreen from './console-screen.js';
import {isBrowser} from '../utils.js';

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
