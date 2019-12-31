<template>
  <div class="home">
    <div class="buttons">
      <button class="button is-link" v-on:click="openAnother">Open</button>
      <button
        v-if="isLogin"
        class="button is-success"
        v-on:click="getAccessToken"
      >
        Get Access Token
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data: function() {
    return {
      isLogin: false,
      userData: {
        userId: null
      }
    };
  },
  methods: {
    login() {
      window.liff.login();
    },
    logout() {
      window.liff.logout();
      window.location.reload();
    },
    openAnother() {
      window.liff.openWindow({
        url: "https://line.me",
        external: true
      });
    },
    getAccessToken() {
      const accessToken = window.liff.getAccessToken();
      alert(accessToken);
      // console.log(accessToken);
    }
  },
  mounted: function() {
    this.isLogin = window.liff.isLoggedIn();
    if (this.isLogin) {
      window.liff.getProfile().then(value => {
        this.userData = value;
      });
    }
  }
};
</script>
