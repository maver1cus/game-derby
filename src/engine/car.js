export default class Car {
  constructor(config) {
    this._coords = config.coords;
    this._life = config.life;
    this._speed = config.speed;
  }

  moving(direction, universe) {
    const coordsCandidate = {}

    switch (direction) {
      case 'left':
        coordsCandidate.x = this._coords.x - this._speed;
        coordsCandidate.y = this._coords.y;
        break;
      case 'right':
        coordsCandidate.x = this._coords.x + this._speed;
        coordsCandidate.y = this._coords.y;
        break;
      case 'top':
        coordsCandidate.x = this._coords.x;
        coordsCandidate.y = this._coords.y - this._speed;
        break;
      case 'bottom':
        coordsCandidate.x = this._coords.x;
        coordsCandidate.y = this._coords.y + this._speed;
        break;
    }

    this._coords = universe.validateCoords(coordsCandidate);
  }
}
