import {getRandomItemFromArray} from '../../utils';
import {Directions} from '../../const';
import ICar from './car.interface';
import BusEvents from "../bus-events/bus-events";
import Item from '../item/item'

export default class Car extends Item implements ICar {
  speed: number;
  directionRide: string;

  constructor(life: number, valueDamageToCrash: number, busEvents: BusEvents, speed: number, directionRide: string) {
    super(life, valueDamageToCrash, busEvents);
    this.speed = speed;
    this.directionRide = directionRide;

    this.init();
  }

  init() {
    super.init();

    this.busEvents.subscribe(
      BusEvents.Events.World.END, this.handleWorldEnd.bind(this)
    );
  }

  handleCrash(element: Item, element2: Item) {
    super.handleCrash(element, element2);

    this.changeDirection();
  }

  handleWorldEnd(element: Item) {
    if (element !== this) {
      return;
    }

    this.changeDirection();
  }

  getSpeed() {
    return this.speed;
  }

  getDirectionRide():string {
    return this.directionRide;
  }

  changeDirection() {
    const directions = Object
      .keys(Directions)
      .filter(direction => direction !== this.getDirectionRide());

    this.directionRide = getRandomItemFromArray(directions);
  }

  static getRandomDirection() {
    return getRandomItemFromArray(Object.keys(Directions));
  }
}
