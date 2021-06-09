import IPlayer from '../player/player.interface';
import IManipulator from './manipulator.interface';
import {OptionsManipulator} from '../../types';

export default class Manipulator implements IManipulator {
  options: OptionsManipulator;
  player: IPlayer

  constructor(options: OptionsManipulator) {
    this.options = options;
  }

  init(player: IPlayer): void {
    this.player = player;
    document.addEventListener('keydown', this.handlerKeyDown.bind(this))
  }

  handlerKeyDown(evt: KeyboardEvent): void {
    const codes = Object.keys(this.options);
    const {code} = evt;
    if (codes.includes(code)) {
      const {action, payload} = this.options[code];
      this.player.execute(action, payload);
    }
  }
}
