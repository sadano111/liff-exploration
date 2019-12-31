<template>
  <div id="app">
    <my-nav-bar></my-nav-bar>
    <router-view />
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar.vue";

export default {
  components: {
    "my-nav-bar": MyNavBar
  }
};
</script>
