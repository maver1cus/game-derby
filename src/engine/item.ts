// @ts-nocheck
import BusEvents from './bus-events';

export default class Item {
  constructor(speed, life, valueDamageToCrash, busEvents) {
    this._life = life;
    this._speed = speed;
    this._valueDamageToCrash = valueDamageToCrash;
    this._busEvents = busEvents;
  }

  init() {
    this._busEvents.subscribe(
      BusEvents.Events.World.CRASH, this._handleCrash.bind(this)
    );

    this._busEvents.subscribe(
      BusEvents.Events.World.END, this._handleWorldEnd.bind(this)
    );
  }

  _handleCrash(element, markElement) {
    if (element !== this) {
      return;
    }

    element.takingDamage(markElement.getValueDamageToCrash());
    markElement.takingDamage(element.getValueDamageToCrash());

    if (element._life < 0) {
      this._busEvents.emit(BusEvents.Events.Item.DESTROY, element);
    }

    if (markElement._life < 0) {
      this._busEvents.emit(BusEvents.Events.Item.DESTROY, markElement);
    }
  }

  takingDamage(damage) {
    this._life = this._life - damage;
  }

  getValueDamageToCrash() {
    return this._valueDamageToCrash;
  }
}
