// @ts-nocheck
import Game from './src/engine/game';
import Car from './src/engine/car';
import Item from './src/engine/item';
import BusEvents from './src/engine/bus-events';
import {isBrowser} from './src/utils';

const busEvents = new BusEvents();

const rootElement = isBrowser()
  ? document.getElementById('root')
  : null;

const config = {
  elements: [
    {
      element: new Car(1, 50, 5, Car.getRandomDirection(), busEvents),
      coords: {x: 10, y: 10}
    },
    {
      element: new Car(1, 50, 5, Car.getRandomDirection(), busEvents),
      coords: {x: 15, y: 15}
    },
    {
      element: new Item(0, 100, 10, busEvents),
      coords: {x: 9, y: 10}
    },
    {
      element: new Item(0, 100, 10, busEvents),
      coords: {x: 11, y: 10}
    },
    {
      element: new Item(0, 100, 10, busEvents),
      coords: {x: 10, y: 9}
    }
  ],
  worldSize: {width: 20, height: 20},
  busEvents,
  rootElement
};


const game = Game.create(config);

game.start();
