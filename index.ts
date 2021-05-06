import Game from './src/engine/game/game';
import Car from './src/engine/car/car';
import Item from './src/engine/item/item';
import BusEvents from './src/engine/bus-events/bus-events';
import {isBrowser} from './src/utils';
import {Config} from './src/types';

const busEvents = new BusEvents();

const rootElement = isBrowser()
  ? document.getElementById('root')
  : null;

console.log(11, busEvents);

const config:Config = {
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
