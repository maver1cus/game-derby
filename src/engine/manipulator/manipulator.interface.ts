import IPlayer from '../player/player.interface';
import {OptionsManipulator} from '../../types';

export default interface IManipulator {
  options: OptionsManipulator;
  player: IPlayer
  init(player: IPlayer): void
}
