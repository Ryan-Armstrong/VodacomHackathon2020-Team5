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
    // this.setData({ toggleCoinAnimation: false });
    // this.setData({ toggleCoinAnimation: true });
    this.navToNewMP();
  },
  navToNewMP() {
    my.navigateToMiniProgram({
      // appId: "3456020058086943",
      appId: "3456020056758077",
      success: res => {
        console.log(JSON.stringify(res));
      },
      fail: res => {
        console.log(JSON.stringify(res));
      }
    });
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
  openGameTwoSimba() {
    getApp().gameState = {
      title: "Simba Brick Smash",
      colors: {
        primary: "black",
        secondary: "#f1c40f",
        background: "white",
        row1: "#C45B48",
        row2: "#E5C027",
        row3: "#458962",
        row4: "#2A2924",
        row5: "#135492"
      },
      bgImage: "assets/images/simba-bg.png"
    };
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
            title: "Simba Brick Smash",
            colors: {
              primary: "black",
              secondary: "#f1c40f",
              background: "white",
              row1: "#C45B48",
              row2: "#E5C027",
              row3: "#458962",
              row4: "#2A2924",
              row5: "#135492"
            },
            bgImage: "assets/images/simba-bg.png"
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
