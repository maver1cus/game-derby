import Car from '../car/car';
import {SIZE_FIELD_WORLD} from '../../const';
import Item from '../item/item';
import World from "../world/world";

const COLORS = new Map<{}, string>();

COLORS.set(Item, '#000');
COLORS.set(Car, '#fcf');

export default class CanvasScreen {
  private world: World
  private display: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    size: {
      width: number,
      height: number
    }
  }
  constructor(world: World, rootElement: HTMLElement) {
    this.world = world;

    this.display = {
      canvas: null,
      ctx: null,
      size: null
    };

    this.createDisplay(rootElement);
  }

  print(): void {
    const elements = this.world.getElements();

    this.clearDisplay();

    elements.forEach((coords: {x: number, y: number}, element: Item): void => {
      this.display.ctx.fillStyle = COLORS.get(element.constructor);
      this.display.ctx.fillRect(
        coords.x * SIZE_FIELD_WORLD,
        coords.y * SIZE_FIELD_WORLD,
        SIZE_FIELD_WORLD,
        SIZE_FIELD_WORLD
      );
    });
  }

  private createDisplay(rootElement: HTMLElement): void {
    this.display.canvas = document.createElement('canvas');
    this.display.ctx = this.display.canvas.getContext('2d');

    this.display.size = {
      width: this.world.getSize().width * SIZE_FIELD_WORLD,
      height: this.world.getSize().height * SIZE_FIELD_WORLD
    };

    this.display.canvas.width = this.display.size.width;
    this.display.canvas.height = this.display.size.height;

    rootElement.append(this.display.canvas);
  }

  clearDisplay() {
    this.display.ctx.clearRect(
      0,
      0,
      this.display.size.width,
      this.display.size.height
    );
  }

  static create(world: World, rootElement: HTMLElement) {
    return new CanvasScreen(world, rootElement);
  }
}
