<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content">
          <div v-if="!isLogin" class="content">
            Please login first. To use our apps.
          </div>
          <div class="content" v-else>
            <figure class="image is-128x128">
              <img v-if="userData.pictureUrl" :src="userData.pictureUrl" />
              <img v-else src="@/assets/user.png" />
            </figure>
            <b-field label="Name">
              <b-input v-model="message"></b-input>
              <button class="button" v-on:click="submit">Submit</button>
            </b-field>
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
        userId: null,
        pictureUrl: null
      },
      message: null
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
    },
    submit() {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      });
      window.liff
        .sendMessages([
          {
            type: "text",
            text: this.message
          }
        ])
        .then(() => {
          loadingComponent.close();
          this.$buefy.notification.open({
            message: "Success Send Message",
            type: "is-success"
          });
        })
        .catch(err => {
          loadingComponent.close();
          this.$buefy.notification.open({
            message: `Can't Send Message! Error: ${err}`,
            type: "is-danger"
          });
        });
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
