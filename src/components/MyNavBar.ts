import { defineComponent } from 'vue';
import liff from '@line/liff';

export default defineComponent({
  name: 'MyNavBar',
  data() {
    return {
      isLogin: false,
      activator: false,
      userData: {
        userId: '',
        displayName: '',
      },
    };
  },
  mounted() {
    this.isLogin = liff.isLoggedIn();
    if (this.isLogin) {
      liff.getProfile().then((value) => {
        this.userData.userId = value.userId;
        this.userData.displayName = value.displayName;
      });
    }
  },
  methods: {
    makeBurger() {
      this.activator = !this.activator;
      return this.activator;
    },
    login() {
      liff.login();
    },
    logout() {
      liff.logout();
      window.location.reload();
    },
    openAnother() {
      liff.openWindow({
        url: 'https://line.me',
        external: true,
      });
    },
    getAccessToken() {
      const accessToken = liff.getAccessToken();
      alert(accessToken);
      // console.log(accessToken);
    },
  },
});
