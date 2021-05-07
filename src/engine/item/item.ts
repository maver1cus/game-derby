import BusEvents from '../bus-events/bus-events';
import IItem from "./item.inteface";

export default class Item implements IItem{
  private life: number;
  readonly valueDamageToCrash: number;
  busEvents: BusEvents;

  constructor(life: number, valueDamageToCrash: number, busEvents: BusEvents) {
    this.life = life;
    this.valueDamageToCrash = valueDamageToCrash;
    this.busEvents = busEvents;
  }

  init() {
    this.busEvents.subscribe(
      BusEvents.Events.World.CRASH, this.handleCrash.bind(this)
    );
  }

  handleCrash(element: Item, markElement: Item) {
    if (element !== this) {
      return;
    }

    element.takingDamage(markElement.getValueDamageToCrash());
    markElement.takingDamage(element.getValueDamageToCrash());

    if (element.life < 0) {
      this.busEvents.emit(BusEvents.Events.Item.DESTROY, element);
    }

    if (markElement.life < 0) {
      this.busEvents.emit(BusEvents.Events.Item.DESTROY, markElement);
    }
  }

  takingDamage(damage: number) {
    this.life = this.life - damage
  }

  getValueDamageToCrash() {
    return this.valueDamageToCrash;
  }
}
