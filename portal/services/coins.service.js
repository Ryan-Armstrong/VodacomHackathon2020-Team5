import { Subject } from "rxjs";

class CoinsService {
  app;
  coins;

  constructor() {
    this.app = getApp();
  }

  getCoins() {
    return this.coins;
  }

  setCoins(coins) {
    this.coins = coins;
  }
}

const coinService = new CoinsService();

export default coinService;
