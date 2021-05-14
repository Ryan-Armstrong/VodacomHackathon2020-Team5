import { Subject } from "rxjs";

class CoinsService {
  app;
  coins = 0;

  games = [
    {
      id: "spin",
      name: "Voda Spin-to-Win",
      image: "../../assets/images/spin-image.png",
      unlocked: true
    },
    {
      id: "bricks",
      name: "Voda Bricks",
      image: "../../assets/images/bricks-image.png",
      unlocked: true
    },
    {
      id: "snake",
      name: "Voda Snake",
      image: "../../assets/images/snake-image.png",
      unlocked: true
    }
  ];

  constructor() {
    this.app = getApp();
    this.newCoinsSubject = new Subject();
    this.newGameSubject = new Subject();
    this.noGameSubject = new Subject();
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

  newGameUnlocked(id) {
    console.log(id);
    console.log(this.games[id]);

    if (this.games[id].unlocked === false) {
      this.games[id].unlocked = true;
      this.newGameSubject.next(this.games[id]);
    } else {
      console.log("has game");
      this.noGameSubject.next();
    }
  }
}

const coinService = new CoinsService();

export default coinService;
