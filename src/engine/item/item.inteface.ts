import BusEvents from '../bus-events/bus-events';

export default interface IItem {
  busEvents: BusEvents
  init():void;
  handleCrash(element: IItem, markElement: IItem): void;
  getValueDamageToCrash(): number;
  getSpeed?(): number;
  getDirectionRide?(): string;
}
