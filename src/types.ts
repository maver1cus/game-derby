import IItem from './engine/item/item.inteface';
import Emitter from './engine/emitter/emitter';
import {Actions} from './const';

export type Coords = {
  x: number,
  y: number
}

export type Element = {
  element: IItem
  coords: Coords
}
export type Elements = Element[];

export type WorldSize = {
  width: number,
  height: number
}

export type Config = {
  elements: Elements,
  worldSize: WorldSize,
  busEvents: Emitter,
  rootElement: HTMLElement
}

export type SimpleMap = Map<unknown, string>;

export type OptionsManipulator = {[key: string]: {
    action: Actions,
    payload: string
  }
}
