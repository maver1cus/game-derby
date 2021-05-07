import BusEvents from "./engine/bus-events/bus-events";
import {isBrowser} from "./utils";
import {Config} from "./types";
import Car from "./engine/car/car";
import Item from "./engine/item/item";

const busEvents = new BusEvents();

const rootElement = isBrowser()
  ? document.getElementById('root')
  : null;

export const config:Config = {
  elements: [
    {
      element: new Car(50, 5, busEvents, 1, Car.getRandomDirection()),
      coords: {x: 10, y: 10}
    },
    {
      element: new Car(50, 5, busEvents, 1, Car.getRandomDirection()),
      coords: {x: 15, y: 15}
    },
    {
      element: new Item( 100, 10, busEvents),
      coords: {x: 9, y: 10}
    },
    {
      element: new Item(100, 10, busEvents),
      coords: {x: 11, y: 10}
    },
    {
      element: new Item( 100, 10, busEvents),
      coords: {x: 10, y: 9}
    }
  ],
  worldSize: {width: 20, height: 20},
  busEvents,
  rootElement
};
