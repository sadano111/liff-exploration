<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }"
        >About</b-navbar-item
      >
    </template>

    <template slot="end">
      <b-navbar-item v-if="isLogin" tag="div">
        {{ userData.displayName }}
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="!isLogin" class="button is-primary" v-on:click="login"
            >Login</a
          >
          <a v-else class="button is-danger" v-on:click="logout">Logout</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "MyNavBar",
  data: function() {
    return {
      isLogin: false,
      userData: {
        userId: null,
        displayName: null
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
