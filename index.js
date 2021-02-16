import Game from './src/engine/game.js';
import Car from './src/engine/car.js';
import Item from './src/engine/item.js';

const config = {
  elements: [
    {
      element: new Car(1, 50, Car.getDirection()),
      coords: {x: 0, y: 0}
    },
    {
      element: new Car(1, 50, Car.getDirection()),
      coords: {x: 20, y: 20}
    },
    {
      element: new Item(),
      coords: {x: 3, y: 4}
    },
    {
      element: new Item(),
      coords: {x: 4, y: 5}
    }
  ],
  worldSize: {width: 20, height: 20}
};

const game = Game.create(config);

game.start();
