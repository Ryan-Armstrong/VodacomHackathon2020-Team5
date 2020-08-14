// based on the mozilla breakout game
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

import coinService from "../../services/coins.service.js";

Page({
  data: {
    state: {
      title: "Voda Bricks",
      colors: {
        primary: "#C0392B",
        secondary: "#C0392B",
        background: "white",
        row1: "#FF9287",
        row2: "#D95D51",
        row3: "#C0392B",
        row4: "#9B2114",
        row5: "#720B00"
      },
      bgImage: "assets/images/voda-light.jpeg"
    },
    score: 0,
    showScore: true
  },
  touchX: 0,
  touchY: 0,
  ctx: null,
  cHeight: 400,
  cWidth: 380,
  x: 380 / 2,
  y: 400 - 30,
  dx: 2,
  dy: -2,
  ballRadius: 10,
  paddleHeight: 10,
  paddleWidth: 75,
  paddleX: (380 - 75) / 2,
  rightPressed: false,
  leftPressed: false,
  brickRowCount: 5,
  brickColumnCount: 4,
  brickWidth: 75,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 20,
  bricks: [],
  background: null,
  startBall: false,
  onReady() {},
  onLoad() {
    if (getApp().gameState.title && getApp().gameState.colors) {
      console.log(getApp().gameState.title);
      console.log(getApp().gameState.colors);
      const state = {
        title: getApp().gameState.title,
        colors: getApp().gameState.colors,
        bgImage: getApp().gameState.bgImage
      };
      this.setData({ state });
      getApp().gameState = {};
    }
    console.log(getApp().gameState);
    console.log(this.data);
    for (var c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (var r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    this.ctx = my.createCanvasContext("canvas");
    this.interval = setInterval(() => this.draw(), 18);
    setTimeout(() => {
      this.startBall = true;
    }, 2000);
  },
  onUnload() {
    clearInterval(this.interval);
    this.ctx = null;
  },
  left() {
    this.leftPressed = true;
    setTimeout(() => {
      this.leftPressed = false;
    }, 100);
  },
  right() {
    this.rightPressed = true;
    setTimeout(() => {
      this.rightPressed = false;
    }, 100);
  },
  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = this.data.state.colors.secondary;
    this.ctx.fill();
    this.ctx.closePath();
  },
  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.cHeight - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
    // this.ctx.fillStyle = "#e74c3c";
    this.ctx.fillStyle = this.data.state.colors.primary;
    this.ctx.fill();
    this.ctx.closePath();
  },
  drawBricks() {
    for (var c = 0; c < this.brickColumnCount; c++) {
      for (var r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          var brickX =
            c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          var brickY =
            r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          // this.ctx.fillStyle = "#e74c3c";
          if (r === 0) {
            this.ctx.fillStyle = this.data.state.colors.row1;
          } else if (r === 1) {
            this.ctx.fillStyle = this.data.state.colors.row2;
          } else if (r === 2) {
            this.ctx.fillStyle = this.data.state.colors.row3;
          } else if (r === 3) {
            this.ctx.fillStyle = this.data.state.colors.row4;
          } else if (r === 4) {
            this.ctx.fillStyle = this.data.state.colors.row5;
          } else {
            this.ctx.fillStyle = this.data.state.colors.secondary;
          }
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  },
  collisionDetection() {
    for (var c = 0; c < this.brickColumnCount; c++) {
      for (var r = 0; r < this.brickRowCount; r++) {
        var b = this.bricks[c][r];
        if (b.status == 1) {
          if (
            this.x > b.x &&
            this.x < b.x + this.brickWidth &&
            this.y > b.y &&
            this.y < b.y + this.brickHeight
          ) {
            this.dy = -this.dy;
            b.status = 0;
            // score++;
            let score = this.data.score + 10;

            this.setData({ score: score });
            this.togleScore();
            console.log(this.data.score);
            if (score / 10 == this.brickRowCount * this.brickColumnCount) {
              // console.warn("YOU WIN!!!");
              // clearInterval(this.interval);
              // coinService.addCoins(score);
              // my.navigateBack();
              // setTimeout(() => {
              // my.navigateBack();
              // console.log("adding coins");
              // coinService.addCoins(this.data.score);
              // }, 3000);
              this.setData({ win: true });
            }
          }
        }
      }
    }
  },
  draw() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    this.drawBricks();
    if (this.startBall) {
      this.drawBall();
    }
    this.drawPaddle();
    this.collisionDetection();

    if (this.startBall) {
      if (
        this.x + this.dx > this.cWidth - this.ballRadius ||
        this.x + this.dx < this.ballRadius
      ) {
        this.dx = -this.dx;
      } else if (this.y + this.dy > this.cHeight - this.ballRadius) {
        if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
          this.dy = -this.dy;
        } else {
          // this.dy = -this.dy;
          console.error("GAME OVER");
          clearInterval(this.interval);
          this.setData({ lose: true });
        }
      }

      if (
        this.y + this.dy > this.cHeight - this.ballRadius ||
        this.y + this.dy < this.ballRadius
      ) {
        this.dy = -this.dy;
      }

      if (this.rightPressed) {
        this.paddleX += 7;
        if (this.paddleX + this.paddleWidth > this.cWidth) {
          this.paddleX = this.cWidth - this.paddleWidth;
        }
      } else if (this.leftPressed) {
        this.paddleX -= 7;
        if (this.paddleX < 0) {
          this.paddleX = 0;
        }
      }
      this.x += this.dx;
      this.y += this.dy;
    }
    this.ctx.draw();
  },
  touchMoveHandler(x, y) {
    var relativeX = x - 20;
    if (relativeX > 0 && relativeX < this.cWidth) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
    console.log("----");
    console.log(this.paddleX, relativeX, this.cWidth, this.paddleWidth);
  },
  touch(e) {
    console.log(e);
    if (e.touches && e.touches[0]) {
      this.touchX = e.touches[0].x;
      this.touchY = e.touches[0].y;
      this.touching = true;
    } else {
      this.touchMoveHandler(this.touchX, this.touchY);
      this.touching = false;
    }
  },
  togleScore() {
    this.setData({ showScore: false });
    this.setData({ showScore: true });
  },
  navBack() {
    my.navigateBack();
    coinService.addCoins(this.data.score);
  }
});
