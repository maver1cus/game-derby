import IPlayer from './player.interface';
import ICar from '../car/car.interface';
import {Actions} from '../../const';

export default class Player implements IPlayer {
  car: ICar;

  init(car: ICar): void {
    this.car = car;
  }

  execute(action: Actions, payload: string): void {
    switch (action) {
      case Actions.CHANGE_DIRECTION:
        this.car.changeDirection(payload);
        break;
      case Actions.STOP:
        this.car.stopCar();
        break;
      default:
        return;
    }
  }
}
