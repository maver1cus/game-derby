import {getRandomItemFromArray} from '../../utils/common';
import {Directions} from '../../const';
import IItem from '../item/item.inteface';
import BusEvents from '../bus-events/bus-events';
import Item from '../item/item';

export default class Car extends Item implements IItem {
  private readonly speed: number;
  private directionRide: string;

  constructor(
      life: number,
      valueDamageToCrash: number,
      busEvents: BusEvents,
      speed: number,
      directionRide: string
  ) {
    super(life, valueDamageToCrash, busEvents);

    this.speed = speed;
    this.directionRide = directionRide;

    this.init();
  }

  init(): void {
    super.init();

    this.busEvents.subscribe(
        BusEvents.Events.World.END, this.handleWorldEnd.bind(this)
    );
  }

  handleCrash(elementFirst: Item, elementSecond: Item): void {
    super.handleCrash(elementFirst, elementSecond);

    this.changeDirection();
  }

  handleWorldEnd(element: Item): void {
    if (element !== this) {
      return;
    }

    this.changeDirection();
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getDirectionRide(): string {
    return this.directionRide;
  }

  private changeDirection(): void {
    const directions = Object
        .keys(Directions)
        .filter((direction) => direction !== this.getDirectionRide());

    this.directionRide = getRandomItemFromArray(directions);
  }

  static getRandomDirection(): string {
    return getRandomItemFromArray(Object.keys(Directions));
  }
}
