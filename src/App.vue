<template>
  <v-app>

    <v-main>
      <p class="headline text-center">news-app</p>

      <v-divider></v-divider>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment';

export default {
  name: 'App',

  data: () => ({
    //
  }),

  created() {
    moment.locale('ru');
  }
};
</script>
