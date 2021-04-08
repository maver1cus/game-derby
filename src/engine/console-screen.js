import Car from './car.js';
import {SymbolsForPrintElements} from '../const.js';
import Item from './item.js';

const configSymbolsElementsForPrint = [
  {element: Item, symbol: SymbolsForPrintElements.ITEM},
  {element: Car, symbol: SymbolsForPrintElements.CAR}
];

const createSymbolsElementsForPrint = (items) => {
  const symbols = new Map();

  items.forEach(({element, symbol}) => {
    symbols.set(element, symbol);
  });

  return symbols;
};

export default class ConsoleScreen {
  constructor(world) {
    this._world = world;
    this._symbolsForItems = createSymbolsElementsForPrint(
        configSymbolsElementsForPrint
    );
  }

  print() {
    const worldSize = this._world.getSize();
    const output = [];

    for (let i = 0; i < worldSize.height; i++) {
      output.push(Array(worldSize.width).fill(` `));
    }

    const elements = this._world.getElements();

    elements.forEach((coords, element) => {
      const {x, y} = coords;
      output[y][x] = this._symbolsForItems.get(element.constructor);
    });

    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log(
        output
            .map((row) => `|` + row.join(` `) + `|`)
            .join(`\n`)
    );

    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log('');
  }

  static create(world) {
    return new ConsoleScreen(world);
  }
}
