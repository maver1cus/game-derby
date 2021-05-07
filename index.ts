import Game from './src/engine/game/game';
import {config} from './src/config';

const game = Game.create(config);
game.start();
