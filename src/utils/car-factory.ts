import BusEvents from '../engine/bus-events/bus-events';
import Player from '../engine/player/player';
import Car from '../engine/car/car';
import ICar from '../engine/car/car.interface';
import IManipulator from '../engine/manipulator/manipulator.interface';

export const createCar = (
    life: number,
    valueDamageToCrash: number,
    busEvents: BusEvents,
    speed: number,
    directionRide: string,
    manipulator: IManipulator
): ICar => {
  const player = new Player();
  const car = new Car(
      life,
      valueDamageToCrash,
      busEvents,
      speed,
      directionRide,
      player
  );

  manipulator.init(player);
  player.init(car);

  return car;
}
