import { makeAutoObservable } from 'mobx';

class Counter {
  private value = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get getCounter() {
    return this.value;
  }

  increment(val: number) {
    this.value += val;
  }

  decrement(val: number) {
    this.value -= val;
  }

  reset() {
    this.value = 0;
  }
}

const counter = new Counter();

export default counter;
