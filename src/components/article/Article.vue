<!-- Статья -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" xl="6">
        <v-row class=" d-flex">
          <v-col cols="12 pt-0 pb-4">
            {{guid}}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from 'moment';
  
  export default {
    name: 'Article',

    props: ['guid'],

    data: () => ({
      moment
    }),
  }
</script>
