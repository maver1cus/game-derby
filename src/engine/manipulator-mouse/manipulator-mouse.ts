import IManipulator from '../manipulator/manipulator.interface';
import IPlayer from '../player/player.interface';
import {Actions, Directions} from '../../const';
import {Coords} from '../../types';

export default class ManipulatorMouse implements IManipulator {
  player: IPlayer

  constructor() {
    this.player = null;
  }

  init(player: IPlayer): void {
    this.player = player;

    document.addEventListener('mousedown', this.handlerMouseKeydown.bind(this))
  }

  handlerMouseKeydown(evt: MouseEvent): void {
    if (evt.button === 0) {
      const startCoords = {
        x: evt.clientX,
        y: evt.clientY
      }

      document.onmouseup = (event) => this.handlerMouseup(event, startCoords);
    }

    if (evt.button === 2) {
      this.player.execute(Actions.STOP, '');
    }
  }

  handlerMouseup(event: MouseEvent, startCoords: Coords): void {
    const endCoords = {
      x: event.clientX,
      y: event.clientY
    }

    const direction = ManipulatorMouse.getDirection(startCoords, endCoords);

    this.player.execute(Actions.CHANGE_DIRECTION, direction);

    document.onmouseup = null;
  }

  static getDirection(startCoords: Coords, endCoords: Coords): string {
    const offset = {
      x: startCoords.x - endCoords.x,
      y: startCoords.y - endCoords.y
    }

    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      return offset.x > 0 ? Directions.LEFT : Directions.RIGHT;
    }

    return offset.y > 0 ? Directions.UP : Directions.DOWN;
  }
}
