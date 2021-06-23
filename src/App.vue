<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col cols="12">
          <h2 class="headline text-center">news-app</h2>
        </v-col>
      </v-row>

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
