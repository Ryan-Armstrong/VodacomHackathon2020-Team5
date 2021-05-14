Component({
  mixins: [],
  props: {
    title: '',
    text: '',
    notificationText: '',
    notification: false,
    selected: false,
    onTap:()=>{}
  },
  didMount() {
  },
  didUpdate() {
  }, 
  didUnmount() { },
  methods: {
    onTap(){      
      this.props.onTap(this.props.ID);
    }
  },
});


