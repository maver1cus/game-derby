import Car from './car.js';
import {ColorFoPrintElements, SIZE_FIELD_WORLD} from '../const.js';
import Item from './item.js';

const configColorsElementsForPrint = [
  {element: Item, symbol: ColorFoPrintElements.ITEM},
  {element: Car, symbol: ColorFoPrintElements.CAR}
];

const createColorsElementsForPrint = (items) => {
  const colors = new Map();

  items.forEach(({element, symbol}) => {
    colors.set(element, symbol);
  });

  return colors;
};

export default class CanvasScreen {
  constructor(world, rootElement) {
    this._world = world;
    this._colorsELements = createColorsElementsForPrint(
        configColorsElementsForPrint
    );
    this._createDisplay(rootElement);
  }

  _createDisplay(rootElement) {
    this._display = document.createElement('canvas');
    this._ctx = this._display.getContext('2d');

    this._displaySize = {
      width: this._world.getSize().width * SIZE_FIELD_WORLD,
      height: this._world.getSize().height * SIZE_FIELD_WORLD
    };

    this._display.width = this._displaySize.width;
    this._display.height = this._displaySize.height;

    rootElement.append(this._display);
  }

  clearDisplay() {
    this._ctx.clearRect(
        0,
        0,
        this._displaySize.width,
        this._displaySize.height
    );
  }

  print() {
    const elements = this._world.getElements();

    this.clearDisplay();

    elements.forEach((coords, element) => {
      this._ctx.fillStyle = this._colorsELements.get(element.constructor);
      this._ctx.fillRect(
          coords.x * SIZE_FIELD_WORLD,
          coords.y * SIZE_FIELD_WORLD,
          SIZE_FIELD_WORLD,
          SIZE_FIELD_WORLD
      );
    });
  }


  static create(world, rootElement) {
    return new CanvasScreen(world, rootElement);
  }
}
