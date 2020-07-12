import Components from 'vue-class-component'
import Vue from 'vue'
import MyNavBar from '@/components/MyNavBar.vue'

@Components({
  components: {
    'my-nav-bar': MyNavBar,
  },
})
export default class App extends Vue { }