import {getDirection} from "../utils.js";

export default class Game {
  constructor(config) {
    this._cars = config.cars;
    this._items = config.items;
    this._universe = config.universe;
  }

  start() {
    // setInterval(this.gameStep.bind(this), 1000);
    for (let i = 0; i < 10; i++) {
      this.gameStep();
    }
  }

  gameStep() {
    const direction = getDirection();
    this._cars.forEach(car => car.moving(direction, this._universe));

    console.log(`game step:`, this._cars);
  }

  static create(config) {
    return new Game(config);
  }
};
