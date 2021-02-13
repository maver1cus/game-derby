import Game from './src/engine/game.js';
import Car from './src/engine/car';

const config = {
  elements: [
    {
      coords: {x: 0, y: 0},
      life: 50,
      speed: 1,
      directionRide: Car.getDirection(),
      type: 'car'
    },
    {
      coords: {x: 20, y: 20},
      life: 50,
      speed: 1,
      directionRide: Car.getDirection(),
      type: 'car'
    },
    {
      coords: {x: 3, y: 4},
      type: 'item'
    },
    {
      coords: {x: 4, y: 5},
      type: 'item'
    }
  ],
  worldSize: {width: 20, height: 20}
};

const game = Game.create(config);

game.start();
