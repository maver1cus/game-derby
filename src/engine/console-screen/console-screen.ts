// @ts-nocheck
import Car from '../car/car';
import Item from '../item/item';

const SYMBOLS = new Map([
  [Item, '+'],
  [Car, '*']
]);

export default class ConsoleScreen {
  constructor(world) {
    this._world = world;
    this._display = null;

    this._createDisplay();
  }

  print() {
    const worldSize = this._world.getSize();
    this._clearDisplay();

    const elements = this._world.getElements();

    elements.forEach((coords, element) => {
      const {x, y} = coords;
      this._display[y][x] = SYMBOLS.get(element.constructor);
    });

    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log(
      this._display
        .map((row) => `|` + row.join(` `) + `|`)
        .join(`\n`)
    );

    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log('');
  }

  _createDisplay() {
    const {width, height} = this._world.getSize();

    this._display = new Array(height).fill([])
      .map(() => new Array(width).fill(' '));
  }

  _clearDisplay() {
    this._display = this._display
      .map((row) => row.map(() => ' '));
  }

  static create(world) {
    return new ConsoleScreen(world);
  }
}
