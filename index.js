import Game from './src/engine/game.js';
import Car from './src/engine/car.js';
import Item from './src/engine/item.js';

const config = {
  elements: [
    {
      element: new Car(1, 50, Car.getRandomDirection()),
      coords: {x: 10, y: 10}
    },
    {
      element: new Car(1, 50, Car.getRandomDirection()),
      coords: {x: 11, y: 11}
    },
    {
      element: new Item(),
      coords: {x: 10, y: 8}
    },
    {
      element: new Item(),
      coords: {x: 10, y: 12}
    },
    {
      element: new Item(),
      coords: {x: 8, y: 10}
    },
    {
      element: new Item(),
      coords: {x: 12, y: 10}
    }
  ],
  worldSize: {width: 20, height: 20}
};

const game = Game.create(config);

game.start();
