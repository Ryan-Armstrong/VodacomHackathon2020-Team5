Component({
  mixins: [],
  data: {
    chosenCardId: -1
  },
  props: {
    optionsList: [],
    CardBackgroundColor: "",
    iconColor: "var(--primary- white)",
    textColor: "",
    radioButtonColor: "var(--base1)",
    lineSeperatorColor: "",
    showIcons: true,
    showRadioButtons: true,
    onTap: onTap => { }
  },
  didMount() {
    this.setData({
      cssProps: `--color: ${this.props.radioButtonColor};`
    })
  },
  didUnmount() { },
  methods: {
    onTap(event) {
      this.setData({ chosenCardId: event.currentTarget.id })
      this.props.onTap(event)
    },
  },
});
