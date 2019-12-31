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
              <img
                class="is-rounded"
                v-if="userData.pictureUrl"
                :src="userData.pictureUrl"
              />
              <img class="is-rounded" v-else src="@/assets/user.png" />
            </figure>
            <b-field label="Message">
              <b-input v-model="message"></b-input>
            </b-field>
            <button class="button" v-on:click="addNote">Submit</button>
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
      <div v-if="isLogin" class="content">
        <h2 class="title">My Notes</h2>
        <div class="columns is-multiline">
          <div class="column" v-for="(note, index) in notes" :key="index">
            <div class="box">
              <p>{{ note }}</p>
              <div class="buttons">
                <button
                  v-if="isClient"
                  class="button is-link"
                  v-on:click="submit(index)"
                >
                  Send To Chat
                </button>
                <button
                  v-if="isLogin"
                  class="button is-danger"
                  v-on:click="deleteNote(index)"
                >
                  Delete
                </button>
              </div>
            </div>
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
      isClient: false,
      message: null,
      notes: []
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
    addNote() {
      this.notes.push(this.message);
      this.message = "";
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    submit(index) {
      let message = this.notes[index];
      const loadingComponent = this.$buefy.loading.open({
        container: null
      });
      window.liff
        .sendMessages([
          {
            type: "text",
            text: message
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
    },
    loadLocalStorage(userId) {
      const notesList = JSON.parse(localStorage.getItem(`notes-${userId}`));
      if (notesList == null) {
        return;
      }
      this.notes = notesList;
    }
  },
  watch: {
    notes() {
      let userId = this.userData.userId;
      localStorage.setItem(`notes-${userId}`, JSON.stringify(this.notes));
    }
  },
  created: function() {
    this.isLogin = window.liff.isLoggedIn();
    if (this.isLogin) {
      window.liff.getProfile().then(value => {
        this.userData = value;
        this.loadLocalStorage(this.userData.userId);
      });
      this.isClient = window.liff.isInClient();
    }
  }
};
</script>
