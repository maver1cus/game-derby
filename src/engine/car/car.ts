import {getRandomItemFromArray} from '../../utils/common';
import {Directions} from '../../const';
import BusEvents from '../bus-events/bus-events';
import Item from '../item/item';
import ICar from './car.interface';
import IPlayer from '../player/player.interface';

export default class Car extends Item implements ICar {
  private speed: number;
  private directionRide: string;
  private player: IPlayer;

  constructor(
      life: number,
      valueDamageToCrash: number,
      busEvents: BusEvents,
      speed: number,
      directionRide: string,
      player: IPlayer
  ) {
    super(life, valueDamageToCrash, busEvents);

    this.speed = speed;
    this.directionRide = directionRide;
    this.player = player;

    this.init();
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getDirectionRide(): string {
    return this.directionRide;
  }

  public changeDirection(direction: string): void {
    this.directionRide = direction;
  }

  public stopCar(): void {
    this.speed = 0;
  }

  static getRandomDirection(): string {
    return getRandomItemFromArray(Object.keys(Directions));
  }
}
