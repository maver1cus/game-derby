import World from './world.js';

export default class Game {
  constructor(config) {
    this._world = World.create(config);
  }

  start() {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep() {
    this._world.render();
    console.log(this._world);
  }


  static create(config) {
    return new Game(config);
  }
}
