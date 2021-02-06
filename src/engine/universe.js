export default class Universe {
  constructor(size) {
    this._size = size;
  }


  isValidCoordX(coordsX) {
    return coordsX >= 0 && coordsX <= this._size.x;
  }

  isValidCoordY(coordsY) {
    return coordsY >= 0 && coordsY <= this._size.y;
  }

  validateCoords(coords) {
    if (!this.isValidCoordX(coords.x)) {
      coords.x = (coords.x < 0)
        ? coords.x = 0
        : coords.x = this._size.x;
    }

    if (!this.isValidCoordY(coords.y)) {
      coords.y = (coords.y < 0)
        ? coords.y = 0
        : coords.y = this._size.y;
    }

    return coords;
  }
}
