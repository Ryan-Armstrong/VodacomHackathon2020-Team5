import {Route, RouterService} from '../router'

Component({
  mixins: [],
  data: {currentUrl: ""},
  props: {
    url: "",
  },

  didMount() {
    const route = this;
    this.$page.routes? this.$page.routes.push(route) : this.$page.routes = [route];
    const _route = {...Route, 
        url: this.props.url,
       onLoad: this.props.onLoad? this.props.onLoad: ()=>{}};
    RouterService.addRoute(_route);
    this.setData({currentUrl: RouterService.getUrl()}); 
    // RouterService.subscribe((url)=>route.setData({currentUrl:url}));
  },
  didUpdate() {    },

  methods: {

  }
});
