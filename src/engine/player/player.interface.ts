import ICar from '../car/car.interface';
import {Actions} from '../../const';

export default interface IPlayer {
  init(car: ICar): void;
  execute(action: Actions, payload: string): void
}
