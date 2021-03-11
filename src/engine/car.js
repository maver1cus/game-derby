import {getRandomItemFromArray} from '../utils.js';
import {VALUE_DAMAGE_TO_CRASH, Directions} from '../const.js';
import World from './world.js';

export default class Car {
  constructor(speed, life, directionRide, emitter) {
    this._life = life;
    this._speed = speed;
    this._directionRide = directionRide;
    this._emitter = emitter;

    this.init();
  }

  init() {
    this._emitter.subscribe(World.events.crash, this._handleCrash.bind(this));
    this._emitter.subscribe(World.events.end, this._handeleWorldEnd.bind(this));
  }

  _handleCrash(element) {
    if (element !== this) {
      return;
    }

    this._life = this._life - VALUE_DAMAGE_TO_CRASH;

    if (this._life < 0) {
      this._emitter.emit(Car.events.destroy, this);
    }

    this._changeDirection();
  }

  _handeleWorldEnd(element) {
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

  static events = {
    destroy: 'car:destroy'
  }

  static getRandomDirection() {
    const randomKey = getRandomItemFromArray(Object.keys(Directions));

    return Directions[randomKey];
  }
}
