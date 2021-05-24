import IItem from './engine/item/item.inteface';
import BusEvents from './engine/bus-events/bus-events';

export type Element = {
  element: IItem
  coords: {
    x: number,
    y: number
  }
}
export type Elements = Element[];

export type WorldSize = {
  width: number,
  height: number
}

export type Config = {
  elements: Elements,
  worldSize: WorldSize,
  busEvents: BusEvents,
  rootElement: HTMLElement
}

export type SimpleFunction = () => void

export type SimpleMap = Map<unknown, string>;
