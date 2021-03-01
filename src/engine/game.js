import World from './world.js';
import Screen from './screen.js';

export default class Game {
  constructor(config) {
    this._world = World.create(config);
    this._screen = Screen.create(this._world);
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
