import {Directions} from '../const.js';

export default class World {
  constructor(config) {
    this._size = config.worldSize;
    this._elements = new Map();

    this.init(config.elements);
  }

  init(elements) {
    elements.forEach(({element, coords}) => {
      this._elements.set(element, coords);
    });
  }

  _validateCoords(coords) {
    const {x, y} = coords;

    return {
      x: Math.min(Math.max(0, x), this._size.width - 1),
      y: Math.min(Math.max(0, y), this._size.height - 1)
    };
  }

  recount() {
    this._elements.forEach((coords, element) => {
      if (element._speed) {
        const speed = element.speed;
        const direction = element.directionRide;

        switch (direction) {
          case Directions.LEFT:
            coords.x = coords.x - speed;
            break;
          case Directions.RIGHT:
            coords.x = coords.x + speed;
            break;
          case Directions.UP:
            coords.y = coords.y - speed;
            break;
          case Directions.DOWN:
            coords.y = coords.y + speed;
            break;
        }

        coords = this._validateCoords(coords);
        this._elements.set(element, coords);
      }
    });
  }

  getElements() {
    return this._elements;
  }

  getSize() {
    return this._size;
  }

  getCoordsElement(element) {
    return this._elements.get(element);
  }

  static create(config) {
    return new World(config);
  }
}
