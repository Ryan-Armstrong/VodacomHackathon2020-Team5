import coinService from "../../services/coins.service.js";

Page({
  data: {
    score: 0
  },
  h: 390,
  w: 375,
  cw: 15,
  d: null,
  food: null,
  // score: 0,
  snake_array: [],
  onReady() {
    // setTimeout(() => {
    //   this.init();
    // }, 2000);
    this.navToNewMP();
  },
  onLoad() {
    console.log("start game loop");
    setTimeout(() => {
      this.init();
    }, 2000);
  },
  onUnload() {
    console.log("end game loop");
    clearInterval(this.game_loop);
  },
  init() {
    this.d = "right"; //default direction
    this.create_snake();
    this.create_food();
    //finally lets display the score
    // this.score = 0;
    this.setData({ score: 0 });

    //Lets move the snake now using a timer which will trigger the paint function
    //every 60ms
    if (typeof this.game_loop != "undefined") clearInterval(this.game_loop);
    this.game_loop = setInterval(() => {
      this.paint();
    }, 150); //60
  },
  create_snake() {
    var length = 5; //Length of the snake
    this.snake_array = []; //Empty array to start with
    for (var i = length - 1; i >= 0; i--) {
      //This will create a horizontal snake starting from the top left
      this.snake_array.push({
        x: i,
        y: 0
      });
    }
  },
  create_food() {
    this.food = {
      x: Math.round((Math.random() * (this.w - this.cw)) / this.cw),
      // x: 0,
      y: Math.round((Math.random() * (this.h - this.cw)) / this.cw)
    };
    //This will create a cell with x/y between 0-44
    //Because there are 45(450/10) positions accross the rows and columns
  },
  paint() {
    const ctx = my.createCanvasContext("snake-canvas");
    // ctx.fillStyle = "#E60403";
    // ctx.fillRect(0, 0, this.w, this.h);
    // ctx.strokeStyle = "#E60403";
    // ctx.strokeRect(0, 0, this.w, this.h);

    var nx = this.snake_array[0].x;
    var ny = this.snake_array[0].y;

    if (this.d == "right") nx++;
    else if (this.d == "left") nx--;
    else if (this.d == "up") ny--;
    else if (this.d == "down") ny++;

    // GAME OVER...
    if (
      nx == -1 ||
      nx == this.w / this.cw ||
      ny == -1 ||
      ny == this.h / this.cw ||
      this.check_collision(nx, ny, this.snake_array)
    ) {
      //restart game
      // this.init();
      this.setData({ end: true });
      //Lets organize the code a bit now.

      return;
    }

    if (nx == this.food.x && ny == this.food.y) {
      var tail = {
        x: nx,
        y: ny
      };
      // this.score++;
      const score = this.data.score + 10;
      this.setData({ score });
      // my.vibrate({
      //   success: () => {
      //     // my.alert({ title: "Vibration on" });
      //   }
      // });
      //Create new food
      this.create_food();
    } else {
      var tail = this.snake_array.pop(); //pops out the last cell
      tail.x = nx;
      tail.y = ny;
    }

    this.snake_array.unshift(tail); //puts back the tail as the first cell
    for (var i = 0; i < this.snake_array.length; i++) {
      var c = this.snake_array[i];
      //Lets paint 10px wide cells
      // this.paint_cell(c.x, c.y);
      ctx.fillStyle = "white";
      ctx.fillRect(c.x * this.cw, c.y * this.cw, this.cw, this.cw);
      ctx.strokeStyle = "#E60403";
      ctx.strokeRect(c.x * this.cw, c.y * this.cw, this.cw, this.cw);
    }

    ctx.fillStyle = "white";
    ctx.fillRect(
      this.food.x * this.cw,
      this.food.y * this.cw,
      this.cw,
      this.cw
    );
    ctx.strokeStyle = "#E60403";
    ctx.strokeRect(
      this.food.x * this.cw,
      this.food.y * this.cw,
      this.cw,
      this.cw
    );

    ctx.draw();
  },
  check_collision(x, y, array) {
    //This function will check if the provided x/y coordinates exist
    //in an array of cells or not
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) return true;
    }
    return false;
  },
  up() {
    if (this.d !== "down") this.d = "up";
  },
  down() {
    if (this.d !== "up") this.d = "down";
  },
  left() {
    if (this.d !== "right") this.d = "left";
  },
  right() {
    if (this.d !== "left") this.d = "right";
  },
  navBack() {
    my.navigateBack();
    coinService.addCoins(this.data.score);
    coinService.newGameUnlocked(2);
  }
});
