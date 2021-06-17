import {Directions} from '../../const';
import BusEvents from '../bus-events/bus-events';
import {Config, Coords, Elements, WorldSize} from '../../types';
import Item from '../item/item';
import IItem from '../item/item.inteface';
import Car from '../car/car';
import ICar from '../car/car.interface';

export default class World {
  private readonly size: WorldSize;
  private readonly elements: Map<IItem, { x: number, y: number }>;
  private busEvents: BusEvents;

  constructor(config: Config) {
    this.size = config.worldSize;
    this.elements = new Map();
    this.busEvents = config.busEvents;

    this.init(config.elements);
  }

  init(elements: Elements):void {
    elements.forEach(({element, coords}) => {
      this.elements.set(element, coords);
    });

    this.busEvents.subscribe(
        BusEvents.Events.Item.DESTROY, this.handleRemoveElement.bind(this)
    );
  }

  handleRemoveElement(element: Item):void {
    this.elements.delete(element);
  }

  recount(): void {
    const cars = this.getCars();

    cars.forEach((element: ICar) => {
      const speed = element.getSpeed();
      const direction = element.getDirectionRide();

      const candidateCoords = this.getCoordsToElement(element);

      switch (direction) {
        case Directions.LEFT:
          candidateCoords.x = candidateCoords.x - speed;
          break;
        case Directions.RIGHT:
          candidateCoords.x = candidateCoords.x + speed;
          break;
        case Directions.UP:
          candidateCoords.y = candidateCoords.y - speed;
          break;
        case Directions.DOWN:
          candidateCoords.y = candidateCoords.y + speed;
          break;
      }

      if (!this.isValidCoords(candidateCoords)) {
        this.busEvents.emit(BusEvents.Events.World.END, element);
        return;
      }
      const markElement = this.getElementToCoords(candidateCoords);

      this.elements.set(element, candidateCoords);

      if (markElement) {
        this
            .busEvents
            .emit(BusEvents.Events.World.CRASH, element, markElement);
      }
    });
  }

  getElements(): Map<IItem, { x: number, y: number }> {
    return this.elements;
  }

  getSize(): WorldSize {
    return this.size;
  }

  private getCars(): IItem[] {
    return Array.from(this.elements.keys())
        .filter((element) => element instanceof Car)
  }

  private getElementToCoords({x, y}: Coords): IItem {
    let markElement = null;

    this.elements.forEach((coords, element) => {
      if (coords.x === x && coords.y === y) {
        markElement = element;
      }
    });

    return markElement;
  }

  private getCoordsToElement(element: IItem): Coords {
    const coords = this.elements.get(element);

    return {
      x: coords.x,
      y: coords.y
    }
  }

  private isValidCoords({x, y}: {x: number, y: number}): boolean {
    return (
      !(x < 0
        || x > this.size.width - 1
        || y < 0
        || y > this.size.height - 1)
    );
  }
}
