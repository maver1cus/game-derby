import IItem from "../item/item.inteface";
import Item from "../item/item";

export default interface ICar extends IItem {
  handleWorldEnd(element: Item): void;
  getSpeed(): number;
  getDirectionRide(): string
  changeDirection(): void;
}
