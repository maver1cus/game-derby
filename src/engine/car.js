import {getRandomItemFromArray} from '../utils.js';
import {Directions} from '../const.js';

export default class Car {
  constructor(speed, life, directionRide) {
    this._life = life;
    this._speed = speed;
    this._directionRide = directionRide;
    this._symbol = `*`;
  }

  get speed() {
    return this._speed;
  }

  get symbol() {
    return this._symbol;
  }

  get directionRide() {
    this._directionRide = Car.getDirection();
    return this._directionRide;
  }

  static getDirection() {
    const randomKey = getRandomItemFromArray(Object.keys(Directions));
    return Directions[randomKey];
  }
}
