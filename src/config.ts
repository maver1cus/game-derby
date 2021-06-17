import BusEvents from './engine/bus-events/bus-events';
import {isBrowser} from './utils/common';
import {Config} from './types';
import Car from './engine/car/car';
import Item from './engine/item/item';
import {createCar} from './utils/car-factory';
import Manipulator from './engine/manipulator/manipulator';
import {Actions, Directions} from './const';
import ManipulatorMouse from './engine/manipulator-mouse/manipulator-mouse';

const busEvents = new BusEvents();

const rootElement = isBrowser()
  ? document.getElementById('root')
  : null;

export const config: Config = {
  elements: [
    {
      element: createCar(
          50,
          5, busEvents,
          1,
          Car.getRandomDirection(),
          new Manipulator({
            'ArrowLeft': {
              action: Actions.CHANGE_DIRECTION,
              payload: Directions.LEFT
            },
            'ArrowRight': {
              action: Actions.CHANGE_DIRECTION,
              payload: Directions.RIGHT
            },
            'ArrowUp': {
              action: Actions.CHANGE_DIRECTION,
              payload: Directions.UP
            },
            'ArrowDown': {
              action: Actions.CHANGE_DIRECTION,
              payload: Directions.DOWN
            },
            'Space': {
              action: Actions.STOP,
              payload: ''
            }
          })),
      coords: {x: 10, y: 10}
    },
    {
      element: createCar(
          50,
          5,
          busEvents,
          1,
          Car.getRandomDirection(),
          new ManipulatorMouse()
      ),
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
