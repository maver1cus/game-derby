import {getRandomItemFromArray} from '../utils.js';
import {Directions} from '../const.js';
import Item from './item.js';

export default class Car extends Item {
  constructor(speed, life, valueDamageToCrash, directionRide, busEvents) {
    super(speed, life, valueDamageToCrash);
    this._directionRide = directionRide;
    this._busEvents = busEvents;

    this.init();
  }

  _handleCrash(element, element2) {
    super._handleCrash();

    this._changeDirection();
  }

  _handleWorldEnd(element) {
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
