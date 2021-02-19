export default class Screen {
  constructor(world) {
    this._world = world;
  }

  print() {
    const worldSize = this._world.getSize();
    const output = [];

    for (let i = 0; i < worldSize.height; i++) {
      output.push(Array(worldSize.width).fill(` `));
    }
    const elements = this._world.getElements();
    elements.forEach((coords, element) => {
      const {x, y} = coords;
      output[y][x] = element.symbol;
    });

    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log(
        output
            .map((row) => `|` + row.join(` `) + `|`)
            .join(`\n`)
    );
    console.log(Array(worldSize.width + 1).fill(`-`).join(` `));
    console.log('');
  }


  static create(world) {
    return new Screen(world);
  }

  static getSymbolForPrint(element) {

  }
}
