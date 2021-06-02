import IPlayer from './player.interface';
import ICar from '../car/car.interface';

export default class Player implements IPlayer {
  car: ICar;

  init(car: ICar): void {
    this.car = car;
  }
}
