<template>
  <v-app>
    <v-main>
      <Toolbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
h1 {
  text-align: center;
}
</style>

<script lang="ts">
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'AppHeader',
  components: { Toolbar },
};
</script>
