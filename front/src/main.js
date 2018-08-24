import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Meta from 'vue-meta'

Vue.use(Buefy)
Vue.use(Meta)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
