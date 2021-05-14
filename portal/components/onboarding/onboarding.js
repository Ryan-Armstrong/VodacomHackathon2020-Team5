Component({
  mixins: [],
  data: {
    activeCard: 0,
    sliderPosition: 0,
    slidingLeft: true,
    slidingRight: false,
  },
  props: {
    onSubmit: () => { }
  },
  didMount() {
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onSwipeRight() {
      if (this.data.activeCard > 0) {
        this.setData({
          activeCard: this.data.activeCard - 1,
          sliderPosition: this.data.sliderPosition + 100,
        })
      }
    },
    onSwipeLeft() {
      if (this.data.activeCard < this.props.onboardingPages.length - 1) {
        this.setData({
          activeCard: this.data.activeCard + 1,
          sliderPosition: this.data.sliderPosition - 100,
          slidingLeft:true
        })
      }
    },
    onSubmit() {
      this.props.onSubmit();
    }
  },
});
