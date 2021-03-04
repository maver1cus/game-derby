import {getRandomItemFromArray} from '../utils.js';
import {countDamageToCrash, Directions} from '../const.js';

export default class Car {
  constructor(speed, life, directionRide, emitter) {
    this._life = life;
    this._speed = speed;
    this._directionRide = directionRide;
    this._emitter = emitter;

    this.init();
  }

  init() {
    this._emitter.subscribe('world:crash', this._crash.bind(this));
    this._emitter.subscribe('world:end', this._worldEnd.bind(this));
  }

  _crash(element) {
    if (element !== this) {
      return;
    }
    this._life = this._life - countDamageToCrash;
    if (this._life < 0) {
      this._emitter.emit('car:destroy', this);
    }
    this._changeDirection();
  }

  _worldEnd(element) {
    if (element !== this) {
      return;
    }

    this._changeDirection();
  }

  getSpeed() {
    return this._speed;
  }

  getDirectionRide() {
    return this._directionRide;
  }

  _changeDirection() {
    const directions = Object
        .keys(Directions)
        .filter((direction) => Directions[direction] !== this._directionRide);
    const randomDirection = getRandomItemFromArray(directions);
    this._directionRide = Directions[randomDirection];
  }

  static getRandomDirection() {
    const randomKey = getRandomItemFromArray(Object.keys(Directions));

    return Directions[randomKey];
  }
}
