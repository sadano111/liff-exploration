<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="buttons">
      <button v-if="!isLogin" class="button is-primary" v-on:click="login">Login</button>
      <button v-else class="button is-danger" v-on:click="logout">Logout</button>
      <button class="button is-link" v-on:click="openAnother">Open</button>
      <button v-if="isLogin" class="button is-success" v-on:click="getAccessToken">Get Access Token</button>
      <div v-if="isLogin" class="container">
        {{userData.userId}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function() {
    return { isLogin: false, userData: null };
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
      console.log(accessToken);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
