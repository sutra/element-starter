import Vue from 'vue'
import ElementUI from 'element-ui'
import AppendableSelect from './components/AppendableSelect.vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

Vue.component('AppendableSelect', AppendableSelect)

new Vue({
  el: '#app',
  render: h => h(App)
})
