import Game from './src/components/game.js';
import Car from './src/components/car.js';
import Item from './src/components/item.js';

const config = [
  new Car({
    coords: { x: 1, y: 1 },
    life: 50,
    speed: 0,
    type: 'car'
  }),
  new Car({
    coords: { x: 3, y: 3 },
    life: 50,
    speed: 0
  }),
  new Item({
    coords: { x: 5, y: 5}
  })
];

const game = Game.create(config);

game.start()
