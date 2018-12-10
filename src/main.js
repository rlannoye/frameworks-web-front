import Vue from 'vue'
import App from './App_router'

Vue.config.productionTip = false

// nmp install bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

const appli = new Vue({
    render: h => h(App)
}) ;
appli.$mount('#app')