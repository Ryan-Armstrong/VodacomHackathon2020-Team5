Component({
  mixins: [],
  data: {
    selectedClass: "selected",
    notSelectedClass: "not-selected not-selected-text ",
    currentButtonIndex: 0,
  },
  props: {
    button_text_left: "left",
    button_text_middle: "middle",
    button_text_right: "right",
    selectedColor: "var(--primary-red)",
    clickAccentColor: "var(--additional-red)",
    notSelectedColor: "var(--base7)",
    notSelectedTextColor: "var(--base3)",
    buttonShadowColor: "var(--primary-red))",
    onChange: (event) => { }
  },
  didMount() {
    this.setData({
      cssProps: `--selectedColor: ${this.props.selectedColor};
      --clickAccentColor: ${this.props.clickAccentColor};
      --notSelectedColor: ${this.props.notSelectedColor};
      --notSelectedTextColor: ${this.props.notSelectedTextColor};
      --buttonShadowColor: ${this.props.buttonShadowColor};`
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onChange(event) {
      this.props.onChange(event);
    },
    onSubmit(event) {
      if (event.id) {
        this.setData({
          currentButtonIndex: event.id - 1
        })
      }
      this.onChange(event.id)
    }
  },
});
