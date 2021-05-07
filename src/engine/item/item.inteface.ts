import BusEvents from '../bus-events/bus-events';
import Item from './item';

export default interface IItem {
  busEvents: BusEvents
  init(): void;
  handleCrash(element: Item, markElement: Item): void;
  takingDamage(damage: number): void;
  getValueDamageToCrash(): number;
}
