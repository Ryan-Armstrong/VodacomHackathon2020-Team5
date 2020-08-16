import coinService from "../../services/coins.service.js";

Page({
  data: {
    modalOpened: false,
    winningsDescription: "",
    colourLanded: "",
    showClose: false,
    gameProviderLogo: ""
  },
  onLoad() {},
  onReady() {
    setTimeout(() => {
      this.setData({ flash2: true });
    }, 500);

    setTimeout(() => {
      this.setData({ flash3: true });
    }, 700);

    setTimeout(() => {
      this.setData({ wheelanim: true });
    }, 500);

    setTimeout(() => {
      this.setData({ bucksanim: true });
    }, 2000);

    setTimeout(() => {
      this.setData({ btnanim: true });
    }, 2500);

    this.animation = my.createAnimation({
      duration: 3000,
      timeFunction: "ease-in-out",
      delay: 100
    });
    if (Math.random() > 0.5) {
      this.setData({ gameProviderLogo: "../../assets/images/vodacomlogo.png" });
    } else {
      this.setData({ gameProviderLogo: "../../assets/images/simba-logo.png" });
    }
  },
  rotate() {
    const degrees = 2160 * 3 + Math.floor(Math.random() * 360) + 1;
    this.animation.rotate(degrees).step();
    this.setData({ animation: this.animation.export() });
    const scaledDegrees = degrees % 360;
    if (scaledDegrees < 360 * (1 / 8)) {
      this.setData({ winningsDescription: "50 VodaBucks" });
      // coinService.addCoins(50);
      this.setData({ bucks: 50 });
    } else if (scaledDegrees < 360 * (2 / 8)) {
      this.setData({ winningsDescription: "10 VodaBucks" });
      // coinService.addCoins(10);
      this.setData({ bucks: 10 });
    } else if (scaledDegrees < 360 * (3 / 8)) {
      this.setData({ winningsDescription: "100 VodaBucks" });
      this.setData({ bucks: 100 });
      // coinService.addCoins(100);
    } else if (scaledDegrees < 360 * (4 / 8)) {
      this.setData({ winningsDescription: "10 VodaBucks" });
      this.setData({ bucks: 10 });
      // coinService.addCoins(10);
    } else if (scaledDegrees < 360 * (5 / 8)) {
      this.setData({ winningsDescription: "50 VodaBucks" });
      this.setData({ bucks: 50 });
      // coinService.addCoins(50);
    } else if (scaledDegrees < 360 * (6 / 8)) {
      this.setData({ winningsDescription: "10 VodaBucks" });
      this.setData({ bucks: 10 });
      // coinService.addCoins(10);
    } else if (scaledDegrees < 360 * (7 / 8)) {
      this.setData({ winningsDescription: "100 VodaBucks" });
      this.setData({ bucks: 100 });
      // coinService.addCoins(100);
    } else {
      this.setData({ landedColour: "#e74c3c" });
      this.setData({ winningsDescription: "10 VodaBucks" });
      this.setData({ bucks: 10 });
      // this.setData({ winningsDescription: "the amazing grand prize!" });
    }
    this.displayResults();
  },
  closeGame() {
    my.navigateBack();
    // setTimeout(() => {
    coinService.addCoins(this.data.bucks);
    coinService.newGameUnlocked(0);
    // }, 500);
  },
  displayResults() {
    setTimeout(() => {
      this.setData({ modalOpened: true });
    }, 4000);
  }
});
