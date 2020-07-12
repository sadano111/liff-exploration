<template>
  <b-navbar fixed-bottom>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="title">LIFF</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">About</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="isLogin" tag="div">Welcome, {{ userData.displayName }}!</b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="!isLogin" class="button is-primary" v-on:click="login">Login</a>
          <a v-else class="button is-danger" v-on:click="logout">Logout</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts" src="./MyNavBar.ts">
</script>
