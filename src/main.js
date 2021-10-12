import Vue from 'vue'
require('dotenv').config()

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import CKEditor from '@ckeditor/ckeditor5-vue2';

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(CKEditor)

new Vue({
  render: h => h(App),
}).$mount('#app')
