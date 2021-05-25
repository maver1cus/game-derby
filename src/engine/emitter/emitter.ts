type SimpleFunction = () => void;

export default class Emitter {
  listeners: { [key: string]: ((...args: unknown[]) => void)[] }

  constructor() {
    this.listeners = {};
  }

  emit(event:string, ...args: unknown[]): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  subscribe(event:string, fn: SimpleFunction): SimpleFunction {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== fn);
    };
  }
}

