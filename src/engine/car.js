import {getRandomItemFromArray} from '../utils.js';
import {DIRECTIONS} from '../const.js';

export default class Car {
  constructor(speed, life, directionRide) {
    this._life = life;
    this._speed = speed;
    this._directionRide = directionRide;
  }

  get speed() {
    return this._speed;
  }

  get directionRide() {
    this._directionRide = Car.getDirection();
    return this._directionRide;
  }

  static getDirection() {
    return getRandomItemFromArray(DIRECTIONS);
  }
}
