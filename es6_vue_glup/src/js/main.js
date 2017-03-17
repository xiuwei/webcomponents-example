
import Vue from '../../node_modules/vue/dist/vue'
import App from './componets/app.vue'

new Vue({
  el: '#app',
  data: {
    message: "Hello Vue"
  },
  components: { App }
});