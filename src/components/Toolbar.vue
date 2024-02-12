<template>
  <div>
    <v-app-bar app color="orange" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>TournX</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list density="compact" nav>
        <p v-for="(item, itemKey) in items" :key="itemKey">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="item.path"
          >
            <v-list-item
              :prepend-icon="item.icon"
              :title="item.name"
              :value="item.name"
            >
            </v-list-item>
          </router-link>
        </p>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
  import { computed } from 'vue';
  import { useUserStore } from '../modules/users/stores/userStore';
  import { playerRoutes, tournamentMasterRoutes, commonRoutes } from '../plugins/router/routes';

  const userStore = useUserStore;

  export default {
    name: 'Header-component',
    data: () => ({
      items: computed(() => {
        if (userStore.getUser.role === "PLAYER" && useUserStore.getUser.token !== "") {
          return [...playerRoutes, ...commonRoutes];
        }
        else if (userStore.getUser.role === "TOURNAMENT MASTER" && useUserStore.getUser.token !== "") {
          return [...tournamentMasterRoutes, ...commonRoutes]
        }
      }),
      drawer: false,
    }),
  };
</script>
