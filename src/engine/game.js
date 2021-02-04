export default class Game {
  constructor(config) {
    this._config = config;
  }

  start() {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep() {
    console.log(`game step:`, this._config);
  }

  static create(config) {
    return new Game(config);
  }
};
