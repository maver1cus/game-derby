import World from './world.js';
import CanvasScreen from './canvas-screen.js';

export default class Game {
  constructor(config) {
    this._world = World.create(config);
    this._canvasScreen = CanvasScreen.create(this._world, config.rootElement);
  }

  start() {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep() {
    this._world.recount();
    this._canvasScreen.print();
  }

  static create(config) {
    return new Game(config);
  }
}
