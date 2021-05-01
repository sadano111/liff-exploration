import Vue from 'vue';
import liff from '@line/liff';
import Buefy from 'buefy';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;
Vue.use(Buefy);

liff
  .init({
    liffId: '1653651913-rzZXA2dX',
  })
  .then(() => {
    // console.log("LIFF Ready");
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  })
  .catch((err: any) => {
    // console.log(err.code, err.message);
    if (liff.isInClient()) {
      liff.closeWindow();
    } else {
      alert(err);
    }
  });
