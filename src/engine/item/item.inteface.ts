import BusEvents from '../bus-events/bus-events'

export default interface IItem {
  busEvents: BusEvents
  init(): void;
  handleCrash(element: any, markElement: any): void;
  takingDamage(damage: number): void;
  getValueDamageToCrash(): number;
}
