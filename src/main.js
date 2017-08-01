import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import VueResource from 'vue-resource'
import addressPicker from 'vue-address-picker'
/*import '../static/reset.css'*/
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(addressPicker)
NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
Vue.http.interceptors.push(function(request, next) {
    // ...
    // 请求发送前的处理逻辑
    // ...
    next(function(response) {
      if(response.status==500){
        this.$router.push('/404')
      }
      if(response.body.code==1002){
        this.$router.push('/login')
      }
     console.log(response.body.code)
     


        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        return response
    })
})


//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

