const Vector2 = {
  x: 0,
  y: 0,

  Add(vector) {
    let result = Object.assign({}, this);
    result.x += vector.x;
    result.y += vector.y;
    return result;
  },

  Subtract(vector) {
    let result = Object.assign({}, this);
    result.x -= vector.x;
    result.y -= vector.y;
    return result;
  },

  Magnitude() {
    let result = 0;
    result = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    return result;
  },
  Direction() {
    let result = 0;
    let unit = this.UnitVector();
    if ((unit.x === 0 && unit.y === 0) || (unit.y === 0 && unit.x > 0))
      return 0;
    result = Math.atan2(unit.y, unit.x);
    if (result < 0) result += 2 * Math.PI;
    result = (result * 180) / Math.PI;

    return result;
  },
  ScalarMultiply(scalar) {
    let result = Object.assign({}, this);
    result.x *= scalar;
    result.y *= scalar;
    return result;
  },

  UnitVector() {
    let result = Object.assign({}, this);
    result = this.ScalarMultiply(1 / this.Magnitude());
    return result;
  }
};

const SwipeConditions = [
  {
    name: "right",
    limits: {
      lower: 315,
      upper: 45
    },

    condition(direct) {
      return direct < this.limits.upper ||
        direct > this.limits.lower
    },
    response: (props) => props.onSwipeRight(),
  },
  {
    name: "left",
    limits: {
      lower: 135,
      upper: 225
    },
    condition(direct) {
      return direct < this.limits.upper &&
        direct > this.limits.lower
    },
    response: (props) => props.onSwipeLeft(),
  },
  {
    name: "down",
    limits: {
      lower: 225,
      upper: 315
    },
    condition(direct) {
      return direct < this.limits.upper &&
        direct > this.limits.lower
    },
    response: (props) => props.onSwipeDown(),
  },
  {
    name: "up",
    limits: {
      lower: 45,
      upper: 135
    },
    condition(direct) {
      return direct < this.limits.upper &&
        direct > this.limits.lower
    },
    response: (props) => props.onSwipeUp(),
  }

]

Component({
  data: {
    swipeVector: Object.assign({}, Vector2),
    startingVector: Object.assign({}, Vector2),
    swipeDurariton: 0,
    startTime: 0,

  },
  props: {
    onSwipeUp: () => { },
    onSwipeDown: () => { },
    onSwipeLeft: () => { },
    onSwipeRight: () => { },
    minDistance: 100,
    minDuration: 90
  },

  methods: {
    startSwipe(event) {
      this.startTime = event.timeStamp;
      this.swipeVector = Object.assign({}, Vector2);
      this.startingVector = this.event2Vector2(event);
    },
    moveSwipe(event) {
      let moveVector = this.event2Vector2(event);
      moveVector = moveVector.Subtract(this.startingVector);
      this.swipeVector = this.swipeVector.Add(moveVector);
    },
    endSwipe(event) {
      this.moveSwipe(event);
      const duration = event.timeStamp - this.startTime;
      const distance = this.swipeVector.Magnitude();
      if (duration > this.props.minDuration && distance > this.props.minDistance)
        this.classifySwipe();
    },

    classifySwipe() {
      let dir = this.swipeVector.Direction();
      const swipe = SwipeConditions.find((sw) => sw.condition(dir))
      swipe.response(this.props);
    },

    event2Vector2(event) {
      let result = Object.assign({}, Vector2);
      result.x = event.changedTouches[0].pageX;
      result.y = -event.changedTouches[0].pageY;
      return result;
    }
  }
});
