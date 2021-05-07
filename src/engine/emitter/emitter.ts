export default class Emitter {
  listeners: { [key: string]: Function[] }

  constructor() {
    this.listeners = {};
  }

  emit(event:string, ...args:any): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }

    this.listeners[event].forEach((listener: Function) => {
      listener(...args);
    });

    return true;
  }

  subscribe(event:string, fn:Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event]
        .filter((listener: Function) => listener !== fn);
    };
  }
}
