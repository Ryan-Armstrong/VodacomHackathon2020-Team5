Component({
  mixins: [],
  props: {
    imageURL: "",
    style: 'dark',
    onTap: () => { },
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onTap() {
      this.props.onTap(this.props.ID);
    }
  },
});
