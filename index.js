import Game from './src/engine/game.js';
import Car from './src/engine/car.js';
import Item from './src/engine/item.js';
import BusEvents from './src/engine/bus-events.js';

const busEvents = new BusEvents();

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
  busEvents
};

const game = Game.create(config);

game.start();
