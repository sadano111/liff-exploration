import { createStore } from 'vuex';

export default createStore({
  state: {
    isLogin: false,
  },
  mutations: {
    setLogin(state, isLogedin) {
      state.isLogin = isLogedin;
    },
  },
  actions: {},
  modules: {},
});
