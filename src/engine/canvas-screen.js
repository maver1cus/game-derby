import Car from './car.js';
import {SIZE_FIELD_WORLD} from '../const.js';
import Item from './item.js';

const COLORS = new Map([
  [Item, '#000'],
  [Car, '#fcf']
]);

export default class CanvasScreen {
  constructor(world, rootElement) {
    this._world = world;

    this._display = {
      canvas: null,
      ctx: null,
      size: null
    };

    this._createDisplay(rootElement);
  }

  print() {
    const elements = this._world.getElements();

    this._clearDisplay();

    elements.forEach((coords, element) => {
      this._display.ctx.fillStyle = COLORS.get(element.constructor);
      this._display.ctx.fillRect(
          coords.x * SIZE_FIELD_WORLD,
          coords.y * SIZE_FIELD_WORLD,
          SIZE_FIELD_WORLD,
          SIZE_FIELD_WORLD
      );
    });
  }

  _createDisplay(rootElement) {
    this._display.canvas = document.createElement('canvas');
    this._display.ctx = this._display.canvas.getContext('2d');

    this._display.size = {
      width: this._world.getSize().width * SIZE_FIELD_WORLD,
      height: this._world.getSize().height * SIZE_FIELD_WORLD
    };

    this._display.canvas.width = this._display.size.width;
    this._display.canvas.height = this._display.size.height;

    rootElement.append(this._display.canvas);
  }

  _clearDisplay() {
    this._display.ctx.clearRect(
        0,
        0,
        this._display.size.width,
        this._display.size.height
    );
  }

  static create(world, rootElement) {
    return new CanvasScreen(world, rootElement);
  }
}
