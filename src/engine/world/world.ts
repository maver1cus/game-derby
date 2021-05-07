import {Directions} from '../../const';
import BusEvents from '../bus-events/bus-events';
import {Config, Elements, WorldSize} from "../../types";
import Item from "../item/item";
import Car from "../car/car";

export default class World {
  size: WorldSize;
  elements: Map<{}, { x: number, y: number }>;
  busEvents: BusEvents;

  constructor(config: Config) {
    this.size = config.worldSize;
    this.elements = new Map();
    this.busEvents = config.busEvents;

    this.init(config.elements);
  }

  init(elements: Elements) {
    elements.forEach(({element, coords}) => {
      this.elements.set(element, coords);
    });

    this.busEvents.subscribe(
      BusEvents.Events.Item.DESTROY, this.handleRemoveElement.bind(this)
    );
  }

  private handleRemoveElement(element: Item) {
    this.elements.delete(element);
  }

  recount() {
      this.elements.forEach((coords, element: Item) => {

        if (element instanceof Car) {
          if (element.getSpeed) {
            const speed = element.getSpeed();
            const direction = element.getDirectionRide();
            const candidateCoords = {x: coords.x, y: coords.y};

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

            if (markElement) {
              this.
              busEvents
                .emit(BusEvents.Events.World.CRASH, element, markElement);
            }
            this.elements.set(element, candidateCoords);
          }

        }

    });
  }

  getElements() {
    return this.elements;
  }

  getSize() {
    return this.size;
  }

  private getElementToCoords({x, y}: {x: number, y: number}):any {
    let markElement = null;

    this.elements.forEach((coords, element) => {
      if (coords.x === x && coords.y === y) {
        markElement = element;
      }
    });

    return markElement;
  }

  private isValidCoords({x, y}: {x: number, y: number}): boolean {
    return (
      !(x < 0
        || x > this.size.width - 1
        || y < 0
        || y > this.size.height - 1)
    );
  }

  static create(config: Config) {
    return new World(config);
  }
}
