import { makeAutoObservable } from 'mobx';

class Welcome {
  private value = '';

  constructor() {
    makeAutoObservable(this);
  }

  get getWelcome() {
    return this.value;
  }

  setWelcome(val: string) {
    this.value = val;
  }

  reset() {
    this.value = '';
  }
}

const welcome = new Welcome();

export default welcome;
