Component({
  mixins: [],
  props: {
    imageURL: "",
    backroundURL: "",
    style: 'dark',
    onTap: () => { },
    height: '280'
  },
  didMount() {},
  didUpdate() { },
  didUnmount() { },
  methods: {
    onTap() {
      this.props.onTap(this.props.ID);
    }
  },
});
