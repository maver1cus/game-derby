import Item from './item.js';
import Car from './car.js';

export default class World {
  constructor(config) {
    this._size = config.worldSize;
    this._elementsPositions = new Map();
    this._elements = [];
    this.i = 0;

    this.init(config.elements)
  }

  init(elements) {
    elements.forEach(element => {
      let newElement;

      switch (element.type) {
        case `car`:
          newElement = new Car(element.speed, element.life, element.directionRide);
          break;
        case `item`:
          newElement = new Item();
          break;
      }

      this._elements.push(newElement);
      this._elementsPositions.set(newElement, element.coords);

    })
  }

  _validateCoords(coords) {
    const {x, y} = coords;
    return {
      x: Math.min( Math.max(0, x), this._size.width ),
      y: Math.min( Math.max(0, y), this._size.height )
    }
  }

  render() {
    this._elements.forEach(element => {
      if (element._speed) {
        const speed = element.speed;
        const direction = element.directionRide;
        let coords = this._elementsPositions.get(element);
        switch (direction) {
          case `left`:
            coords.x = coords.x - speed;
            break;
          case `right`:
            coords.x = coords.x + speed;
            break;
          case `top`:
            coords.y = coords.y - speed;
            break;
          case `bottom`:
            coords.y = coords.y + speed;
            break;
        }

        coords = this._validateCoords(coords);

        this._elementsPositions.set(element, coords);
      }
    })
  }

  static create(worldSize) {
    return new World(worldSize)
  }
}
