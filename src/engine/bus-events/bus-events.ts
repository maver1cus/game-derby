import Emitter from '../emitter/emitter';

interface IEvents {
  [k: string]: {[key: string]: string}
}

export default class BusEvents extends Emitter {
  static get Events(): IEvents {
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
