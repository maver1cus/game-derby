import IScreen from '../console-screen/screen.interface';
import World from '../world/world';
import IItem from '../item/item.inteface';
import Car from '../car/car';
import {Directions, SIZE_FIELD_WORLD} from '../../const';
import {Config} from '../../types';
import BusEvents from '../bus-events/bus-events';
import Item from '../item/item';

const addStyles = (
    domElement: HTMLElement,
    styles: {[key: string]: string}
) => {
  Object
      .keys(styles)
      .forEach((key: string) => {
        // @ts-ignore
        domElement.style[key] = styles[key];
      })
}

const createDomElement = (
    tagName: string,
    styles: {[key: string]: string},
    className: string
): HTMLElement => {
  const domElement = document.createElement(tagName);
  domElement.classList.add(className);
  addStyles(domElement, styles);

  return domElement;
}

export default class DomScreen implements IScreen {
  private world: World;
  private elements: Map<IItem, HTMLElement>;
  readonly screen: HTMLElement;
  rootElement: HTMLElement;
  busEvents: BusEvents;

  constructor(world: World, config: Config) {
    this.world = world;
    this.elements = new Map();
    this.screen = createDomElement('div', {
      width: this.world.getSize().width * SIZE_FIELD_WORLD + 'px',
      height: this.world.getSize().height * SIZE_FIELD_WORLD + 'px',
    }, 'screen');
    this.rootElement = config.rootElement;
    this.busEvents = config.busEvents;


    this.busEvents.subscribe(
        BusEvents.Events.Item.DESTROY, this.handleCrash.bind(this)
    );

    this.init();
  }

  handleCrash(element: Item) {
    const domElement = this.elements.get(element);
    this.screen.removeChild(domElement);
    this.elements.delete(element);
  }

  init() {
    this.world
        .getElements()
        .forEach((coords, element) => {
          const domElement = document.createElement('div');
          if (element instanceof Car) {
            domElement.classList.add('car');
            const direction = element.getDirectionRide();
            this.changeDirection(domElement, direction);
          } else {
            domElement.classList.add('item');
          }

          addStyles(domElement, {
            width: SIZE_FIELD_WORLD + 'px',
            height: SIZE_FIELD_WORLD + 'px',
            top: coords.y * SIZE_FIELD_WORLD + 'px',
            left: coords.x * SIZE_FIELD_WORLD + 'px'
          })

          console.log(element, domElement)
          this.elements.set(element, domElement);
          this.screen.append(domElement);
        });
    this.rootElement.append(this.screen)
  }

  print(): void {
    this.world
        .getElements()
        .forEach((coords, element) => {
          if (element instanceof Car) {
            const currentElement = this.elements.get(element);
            currentElement.style.top = coords.y * SIZE_FIELD_WORLD + 'px';
            currentElement.style.left = coords.x * SIZE_FIELD_WORLD + 'px';
            const direction = element.getDirectionRide();
            this.changeDirection(currentElement, direction);
          }
        })
  }

  private changeDirection(element: HTMLElement, direction: string) {
    switch (direction) {
      case Directions.UP:
        element.style.transform = 'rotate(0)';
        break;
      case Directions.RIGHT:
        element.style.transform = 'rotate(90deg)';
        break;
      case Directions.DOWN:
        element.style.transform = 'rotate(180deg)';
        break;
      case Directions.LEFT:
        element.style.transform = 'rotate(270deg)';
        break;
      default:
        element.style.transform = 'rotate(0)';
    }
  }
}
