import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Input from 'element-ui'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false

// element-ui按需引入
Vue.use(Input) // 输入框组件

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
