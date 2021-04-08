import Emitter from './emitter.js';

export default class BusEvents extends Emitter {
  static get Events() {
    return {
      World: {
        CRASH: 'world:crash',
        END: 'world:end'
      },
      Item: {
        DESTROY: 'car:destroy'
      }
    };
  }
}