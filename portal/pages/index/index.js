Page({
  onReady() {},
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
    // TODO: Implement QR Scanner
  }
});
