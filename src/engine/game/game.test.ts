import Game from './game';
import {config} from '../../config';

test('creating an instance of the Game class with no exceptions', () => {
  expect(() => {
    new Game(config);
  }).not.toThrow(TypeError);
})
