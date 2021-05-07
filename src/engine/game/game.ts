import World from '../world/world';
import CanvasScreen from '../canvas-screen/canvas-screen';
import ConsoleScreen from '../console-screen/console-screen';
import {isBrowser} from '../../utils';
import {Config} from "../../types";

export default class Game {
  private readonly world: World
  private screen: CanvasScreen | ConsoleScreen;

  constructor(config: Config) {
    this.world = World.create(config);
    this.screen = isBrowser()
      ? CanvasScreen.create(this.world, config.rootElement)
      : ConsoleScreen.create(this.world);
  }

  start():void {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep():void {
    this.world.recount();
    this.screen.print();
  }

  static create(config: Config):Game {
    return new Game(config);
  }
}
