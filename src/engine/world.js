import {Directions} from '../const.js';

export default class World {
  constructor(config) {
    this._size = config.worldSize;
    this._elements = new Map();
    this._emitter = config.emitter;

    this.init(config.elements);
  }

  init(elements) {
    elements.forEach(({element, coords}) => {
      this._elements.set(element, coords);
    });

    this._emitter.subscribe('car:destroy', this._removeElement.bind(this));
  }

  _validateCoords(coords) {
    const {x, y} = coords;

    return {
      x: Math.min(Math.max(0, x), this._size.width - 1),
      y: Math.min(Math.max(0, y), this._size.height - 1)
    };
  }

  _removeElement(element) {
    this._elements.delete(element);
  }

  recount() {
    this._elements.forEach((coords, element) => {
      if (element.getSpeed) {
        const speed = element.getSpeed();
        const direction = element.getDirectionRide();
        const candidateCoords = {x: coords.x, y: coords.y};

        switch (direction) {
          case Directions.LEFT:
            candidateCoords.x = candidateCoords.x - speed;
            break;
          case Directions.RIGHT:
            candidateCoords.x = candidateCoords.x + speed;
            break;
          case Directions.UP:
            candidateCoords.y = candidateCoords.y - speed;
            break;
          case Directions.DOWN:
            candidateCoords.y = candidateCoords.y + speed;
            break;
        }

        if (!this._isValidCoords(candidateCoords)) {
          this._emitter.emit('world:end', element);
          return;
        }
        if (!this.isEmptyCoords(candidateCoords)) {
          this._emitter.emit('world:crash', element);
          return;
        }

        this._elements.set(element, candidateCoords);
      }
    });
  }

  getElements() {
    return this._elements;
  }

  getSize() {
    return this._size;
  }

  static create(config) {
    return new World(config);
  }

  _isValidCoords({x, y}) {
    return (
      !(x < 0
        || x > this._size.width - 1
        || y < 0
        || y > this._size.height - 1)
    );
  }

  isEmptyCoords({x, y}) {
    let isEmpty = true;
    this._elements.forEach((value) => {
      if (value.x === x && value.y === y) {
        isEmpty = false;
      }
    });
    return isEmpty;
  }
}
