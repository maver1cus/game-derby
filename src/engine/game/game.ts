import World from '../world/world';
import CanvasScreen from '../canvas-screen/canvas-screen';
import ConsoleScreen from '../console-screen/console-screen';
import {isBrowser} from '../../utils';
import {Config} from '../../types';

export default class Game {
  private readonly world: World
  private screen: CanvasScreen | ConsoleScreen;

  constructor(config: Config) {
    this.world = new World(config);
    this.screen = isBrowser()
      ? new CanvasScreen(this.world, config.rootElement)
      : new ConsoleScreen(this.world);
  }

  start():void {
    setInterval(this.gameStep.bind(this), 1000);
  }

  gameStep():void {
    this.world.recount();
    this.screen.print();
  }
}
