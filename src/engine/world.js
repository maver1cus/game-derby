export default class World {
  constructor(config) {
    this._size = config.worldSize;
    this._elementsPositions = new Map();
    this._elements = [];

    this.init(config.elements);
  }

  init(elements) {
    elements.forEach(({element, coords}) => {
      this._elements.push(element);
      this._elementsPositions.set(element, coords);
    });
  }

  _validateCoords(coords) {
    const {x, y} = coords;

    return {
      x: Math.min(Math.max(0, x), this._size.width),
      y: Math.min(Math.max(0, y), this._size.height)
    };
  }

  recount() {
    this._elements.forEach((element) => {
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
    });
  }

  static create(worldSize) {
    return new World(worldSize);
  }
}
