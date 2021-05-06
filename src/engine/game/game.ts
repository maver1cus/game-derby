// @ts-nocheck
import World from '../world/world';
import CanvasScreen from '../canvas-screen/canvas-screen';
import ConsoleScreen from '../console-screen/console-screen';
import {isBrowser} from '../../utils';

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
    console.log(config)
    return new Game(config);
  }
}
