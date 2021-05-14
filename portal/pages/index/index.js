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
    // this.navToNewMP();
  },
  navToNewMP() {
    my.navigateToMiniProgram({
      appId: "3456020058086943",
      // appId: "3456020056758077",
      success: res => {
        console.log(JSON.stringify(res));
      },
      fail: res => {
        console.log(JSON.stringify(res));
      }
    });
  },
  onReady() {
       coinService.newGameUnlocked(0);
  },
  storage() {
    my.getStorage({
      key: "coins",
      success: function(res) {
        console.log(res);
        my.alert({ content: res.data });
      }
    });
  },
  onLoad() {
    coinService.newCoinsSubject.subscribe(coins => {
      this.setData({ coins: coins });
      console.log(this.data);
      this.spinCoins();
      setTimeout(() => {
        this.spinCoins();
      }, 1500);
    });

    coinService.newGameSubject.subscribe(game => {
      // console.log(unlocked);
      this.setData({
        gameId: game.id,
        gameName: game.name,
        gameImage: game.image,
        gameUnlocked: true
      });
    });

    coinService.noGameSubject.subscribe(game => {
      this.setGames();
    });
    // this.setData({ gameUnlocked: true });
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
      // bgImage: "assets/images/simba-bg.png"
      bgImage: "assets/images/simba-brick-bg.png"
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
  },
  closePopup() {
    this.setData({ gameUnlocked: false });
    this.setGames();
  },
  setGames() {
    if (coinService.games[0].unlocked) {
      setTimeout(() => {
        this.setData({ gameOne: true });
      }, 500);
    }
    if (coinService.games[1].unlocked) {
      setTimeout(() => {
        this.setData({ gameTwo: true });
      }, 1000);
    }
    if (coinService.games[2].unlocked) {
      setTimeout(() => {
        this.setData({ gameThree: true });
      }, 1500);
    }
  }
});
