import Game from './src/engine/game.js';
import Car from './src/engine/car.js';
import Item from './src/engine/item.js';
import Universe from './src/engine/universe.js';

const config = {
  cars: [
    new Car({
      coords: {x: 0, y: 0},
      life: 50,
      speed: 1
    }),
    new Car({
      coords: {x: 20, y: 20},
      life: 50,
      speed: 1
    }),
  ],
  items: [
    new Item({
      coords: {x: 5, y: 5}
    }),
    new Item({
      coords: {x: 3, y: 4}
    })
  ],
  universe: new Universe({x: 20, y: 20})
};

const game = Game.create(config);

game.start()
