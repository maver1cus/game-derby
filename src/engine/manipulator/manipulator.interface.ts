import IPlayer from '../player/player.interface';

export default interface IManipulator {
  player: IPlayer
  init(player: IPlayer): void
}
