<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content">
          <div v-if="!isLogin" class="content">
            Please login first. To use our apps.
          </div>
          <div class="buttons">
            <button class="button is-link" v-on:click="openAnother">
              Open Author Personal Web
            </button>
            <button
              v-if="isLogin"
              class="button is-success"
              v-on:click="getAccessToken"
            >
              Get Access Token
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
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
        url: "https://www.berviantoleo.my.id",
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
