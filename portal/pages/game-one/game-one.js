import coinService from "../../services/coins.service.js";

Page({
  data: {
    modalOpened: false,
    winningsDescription : "",
    colourLanded: "",
    showClose: false,
    gameProviderLogo: ""
  },
  onLoad() {},
  onReady() {
    this.animation = my.createAnimation({
      duration: 3000,
      timeFunction: "ease-in-out",
      delay: 100,
    });
    if(Math.random() > 0.5) {
      this.setData({ gameProviderLogo: "../../assets/images/vodacomlogo.png" });
    } else {
      this.setData({ gameProviderLogo: "../../assets/images/simba-logo.png" });
    }
  },
  rotate() {
    const degrees = 2160 + Math.floor(Math.random() * 360) + 1;
    this.animation.rotate(degrees).step();
    this.setData({ animation: this.animation.export() });
    const scaledDegrees = degrees % 360;
    if (scaledDegrees < (360 * (1/7))) {
      this.setData({ winningsDescription: "50 vodabucks" });
      this.setData({ landedColour: "lilac" });
      coinService.addCoins(50);
    } else if (scaledDegrees < (360 * (2/7))) {
      this.setData({ landedColour: "purple" });
      this.setData({ winningsDescription: "100 vodabucks" });
      coinService.addCoins(100);
    } else if (scaledDegrees < (360 * (3/7))) {
      this.setData({ landedColour: "blue" });
      this.setData({ winningsDescription: "150 vodabucks" });
      coinService.addCoins(150);      
    } else if (scaledDegrees < (360 * (4/7))) {
      this.setData({ landedColour: "green" });
      this.setData({ winningsDescription: "200 vodabucks" });
      coinService.addCoins(200);  
    } else if (scaledDegrees < (360 * (5/7))) {
      this.setData({ landedColour: "yellow" });
      this.setData({ winningsDescription: "250 vodabucks" });
      coinService.addCoins(250);        
    } else if (scaledDegrees < (360 * (6/7))) {
      this.setData({ landedColour: "orange" });
      this.setData({ winningsDescription: "300 vodabucks" });
      coinService.addCoins(300);  
    } else {
      this.setData({ landedColour: "red" });
      this.setData({ winningsDescription: "the amazing grand prize!" });
    }
    this.displayResults();
  },
  closeGame() {
    my.navigateBack();
  },
  displayResults() {
    setTimeout( ()=> {
        this.setData( { modalOpened : true });
    }, 3500);
  }
});
