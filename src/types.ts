import Item from './engine/item/item';
import BusEvents from './engine/bus-events/bus-events';

export type Element = {
  element: Item
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
