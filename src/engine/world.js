import {Directions} from '../const.js';
import BusEvents from './bus-events.js';

export default class World {
  constructor(config) {
    this._size = config.worldSize;
    this._elements = new Map();
    this._busEvents = config.busEvents;

    this.init(config.elements);
  }

  init(elements) {
    elements.forEach(({element, coords}) => {
      this._elements.set(element, coords);
    });

    this._busEvents.subscribe(
        BusEvents.Events.Item.DESTROY, this._handleRemoveElement.bind(this)
    );
  }

  _handleRemoveElement(element) {
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
          this._busEvents.emit(BusEvents.Events.World.END, element);
          return;
        }

        const markElement = this._getElementToCoords(candidateCoords);

        if (markElement) {
          this.
              _busEvents
              .emit(BusEvents.Events.World.CRASH, element, markElement);
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

  _getElementToCoords({x, y}) {
    let markElement = false;
    this._elements.forEach((coords, element) => {
      if (coords.x === x && coords.y === y) {
        markElement = element;
      }
    });
    return markElement;
  }

  _isValidCoords({x, y}) {
    return (
      !(x < 0
        || x > this._size.width - 1
        || y < 0
        || y > this._size.height - 1)
    );
  }

  static create(config) {
    return new World(config);
  }
}
