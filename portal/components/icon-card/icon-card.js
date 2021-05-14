Component({
  props: {
    icon:'',
    text:'',
    onTap:()=>{},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onTap(){
      this.props.onTap(this.props.id);
    }
  },
});
