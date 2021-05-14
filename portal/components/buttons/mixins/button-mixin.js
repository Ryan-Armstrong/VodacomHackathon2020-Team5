export default {
  data: {
    hover_stay: 50,
    hover_start: 10
  },
  props: {
    size: "large",
    className: "",
    disabled: false,
    type: "primary",
    onSubmit: (event) => { },
  },

  methods: {
    onSubmit(event) {
      if (this.props.disabled) return;
      if (this.props.data) { event.data = this.props.data; }
      if (this.props.id) { event.id = this.props.id; }
      this.props.onSubmit(event);
    },
  }
};
