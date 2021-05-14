

export const Route = {
  url: "", 
  onLoad: ()=>{}
}

const routes = []

export const RouterService = {
  currentUrl: "/",
  navigateTo: (url) => {
    let route = routes.find((r)=> r.url === url);
    route = route? route : routes[0];
    RouterService.currentUrl =  route.url;
    console.log(Router)
    Router.updateRoutes(route.url, Router);
    route.onLoad();
  },
  addRoute: (route)=>{routes.push({...route})},
  getUrl: () => RouterService.currentUrl, 
  getActiveRoute: () => routes.find((r)=> r.url === url)
  // subscribers: [],
  // subscribe: (func)=>{
  //   RouterService.subscribers.push(func)},
  // dispatch: (url) => {
  //   RouterService.subscribers.forEach((subscriber)=>{
  //     subscriber(url);
  //   })
  // }
}
let Router = {}
Component({
  data: {

  },
  routes: [],

  didMount(){
    Router = this;
    // router is the last element to mount to the page so accesses the routes from the page before deleting them
    // if there are no routes obtained an error is thrown
    this.routes =  this.$page.routes ? this.$page.routes : {};
    delete this.$page.routes;
    if(Object.keys(this.routes).length === 0 && this.routes.constructor === Object)
    {
      throw new Error('Router must contain route elements');
    }
    this.updateRoutes(RouterService.getUrl(), this)
  },
  methods:
  {
    updateRoutes: function updateRoutes(url)
    {
      this.routes.forEach(route => {
        route.setData({currentUrl: url});
      });
    }
  }
});
