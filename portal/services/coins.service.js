import { Subject } from "rxjs";

class CoinsService {
  app;
  coins = 0;

  constructor() {
    this.app = getApp();
    this.newCoinsSubject = new Subject();
  }

  getCoins() {
    return this.coins;
  }

  // setCoins(coins) {
  //   this.coins = coins;
  // }

  addCoins(coins) {
    this.coins = this.coins + coins;
    this.newCoinsSubject.next(this.coins);
  }
}

const coinService = new CoinsService();

export default coinService;
