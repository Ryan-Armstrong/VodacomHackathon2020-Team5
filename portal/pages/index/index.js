import coinService from "../../services/coins.service.js";

Page({
  data: {
    coins: 0,
    toggleCoinAnimation: true
  },
  gameQR: {
    gameOneVodacom: "https://vodacom-spin.game",
    gameOneSimba: "https://simba-spin.game",
    gameTwoVodacom: "https://vodacom-two.game",
    gameTwoSimba: "https://simba-two.game",
    gameThreeVodacom: "https://vodacom-three.game",
    gameThreeSimba: "https://simba-three.game"
  },
  spinCoins() {
    console.log("spin coins");
    this.setData({ toggleCoinAnimation: false });
    this.setData({ toggleCoinAnimation: true });
  },
  onReady() {},
  onLoad() {
    coinService.newCoinsSubject.subscribe(coins => {
      this.setData({ coins: coins });
      console.log(this.data);
      this.spinCoins();
      setTimeout(() => {
        this.spinCoins();
      }, 1500);
    });
  },
  openGameOne() {
    my.navigateTo({ url: "../game-one/game-one" });
  },
  openGameTwo() {
    my.navigateTo({ url: "../game-two/game-two" });
  },
  openGameThree() {
    my.navigateTo({ url: "../game-three/game-three" });
  },
  scanQR() {
    console.log("scan QR");
    getApp().gameState = {};
    my.scan({
      type: "qr",
      success: res => {
        if (res.code === this.gameQR.gameOneVodacom) {
          setTimeout(() => {
            my.navigateTo({ url: "../game-one/game-one" });
          }, 500);
        }
        if (res.code === this.gameQR.gameOneSimba) {
          getApp().gameState = {
            title: "Simba"
          };
          setTimeout(() => {
            my.navigateTo({ url: "../game-one/game-one" });
          }, 500);
        }
        if (res.code === this.gameQR.gameTwoVodacom) {
          setTimeout(() => {
            my.navigateTo({ url: "../game-two/game-two" });
          }, 500);
        }
        if (res.code === this.gameQR.gameTwoSimba) {
          getApp().gameState = {
            title: "Simba"
          };
          setTimeout(() => {
            my.navigateTo({ url: "../game-two/game-two" });
          }, 500);
        }
        if (res.code === this.gameQR.gameThreeVodacom) {
          setTimeout(() => {
            my.navigateTo({ url: "../game-three/game-three" });
          }, 500);
        }
        if (res.code === this.gameQR.gameThreeSimba) {
          getApp().gameState = {
            title: "Simba"
          };
          setTimeout(() => {
            my.navigateTo({ url: "../game-three/game-three" });
          }, 500);
        }
      }
    });
  }
});
