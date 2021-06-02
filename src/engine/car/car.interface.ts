import IItem from '../item/item.inteface';

export default interface ICar extends IItem {
  getSpeed(): number;
  getDirectionRide(): string;
}
