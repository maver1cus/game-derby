import Item from './engine/item/item'
import Car from './engine/car/car'
import BusEvents from "./engine/bus-events/bus-events";

export type Config = {
  elements: {
    element: Item | Car,
    coords: {
      x: number,
      y: number
    }
  }[],
  worldSize: {
    width: number,
    height: number
  },
  busEvents: BusEvents,
  rootElement: ChildNode
}
