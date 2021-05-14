Component({
  props: { 
    onPrimary: ()=>{},
    onSecondary: ()=>{}
  },
  methods: {
    onPrimary: function onPrimary(){
      this.props.onPrimary();
    },
    onSecondary: function onSecondary(){
      this.props.onSecondary();
    }
  },
});
