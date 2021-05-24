import Car from '../car/car';
import Item from '../item/item';
import World from '../world/world';
import IScreen from './screen.interface';
import {SimpleMap} from '../../types';

const SYMBOLS: SimpleMap = new Map();

SYMBOLS.set(Item, '+');
SYMBOLS.set(Car, '*');

export default class ConsoleScreen implements IScreen {
  private world: World;
  private display: string[][]

  constructor(world: World) {
    this.world = world;
    this.display = [];

    this.createDisplay();
  }

  public print(): void {
    const worldSize = this.world.getSize();
    this.clearDisplay();

    const elements = this.world.getElements();

    elements.forEach((coords: {x: number, y: number}, element: Item) => {
      const {x, y} = coords;
      this.display[y][x] = SYMBOLS.get(element.constructor);
    });

    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log(
        this.display
            .map((row:[]) => `|` + row.join(` `) + `|`)
            .join(`\n`)
    );
    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log('');
  }

  private createDisplay() {
    const {width, height} = this.world.getSize();

    this.display = new Array(height).fill([])
        .map(() => new Array(width).fill(' '));
  }

  private clearDisplay() {
    this.display = this.display
        .map((row:[]) => row.map(() => ' '));
  }
}
