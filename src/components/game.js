export default class Game {
  constructor(config) {
    this.config = config;
  }
  static create(config) {
    return new Game(config);
  }

  start() {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep() {
    console.log(`game step:`, this.config);
  }

};


