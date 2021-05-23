import World from '../world/world';
import {createScreen} from '../../utils';
import {Config} from '../../types';
import {DURATION_STEP_GAME} from '../../const';
import IScreen from '../console-screen/screen.interface';

export default class Game {
  private readonly world: World
  private screen: IScreen;

  constructor(config: Config) {
    this.world = new World(config);
    this.screen = createScreen(this.world, config);
  }

  start(): void {
    setInterval(this.gameStep.bind(this), DURATION_STEP_GAME);
  }

  gameStep(): void {
    this.world.recount();
    this.screen.print();
  }
}
