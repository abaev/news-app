<!-- Статья -->
<template>
  <v-container v-if="article">
    <v-row justify="center">
      <v-col cols="12" md="8" xl="6">
        <v-row class=" d-flex">
          <v-col cols="12 pt-0 pb-4">
            <p class="text-h6 text-md-h4 mb-0">
              {{article.title}}
            </p>

            <p class="mb-0">
              <small>
                {{moment(article.pubDate).format('DD.MM.YY mm:hh')}}
              </small>
            </p>

            <p v-if="article.author">{{article.author}}</p>

            <p>{{article.description}}</p>

            <!-- Поскольку:
            "support for the enclosure element in RSS software varies significantly because of disagreement over whether the specification permits more than one enclosure per item"
            И чтобы не усложнять тут в слайдере одно фото -->
            <v-carousel v-if="article.enclosure.link
              && article.enclosure.type.indexOf('image') !== -1"
              :height="$vuetify.breakpoint.smAndDown
                ? '215' : '480'">
              <v-carousel-item>
                <v-img :src="article.enclosure.link"
                  :contain="$vuetify.breakpoint.smAndDown"
                  @click="showFull = true"
                  class="clickable"></v-img>
              </v-carousel-item>
            </v-carousel>

            <p class="mt-2">
              <a :href="`${article.link}`"
                class="news-app-link deep-purple--text text-accent-4">
                {{article.link}}
              </a>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Просмотр фото в полном размере -->
    <v-overlay v-if="showFull" absolute>
      <v-img :src="article.enclosure.link"
        :contain="$vuetify.breakpoint.smAndDown"
        :width="$vuetify.breakpoint.smAndDown
          ? '350px' : ''"></v-img>

      <!-- Кнопка закрыть полный просмотр фото -->
      <v-btn icon fixed class="close-button"
        @click="showFull = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-overlay>

  </v-container>
</template>

<script>
  import moment from 'moment';
  import api from '@/api/GetRSSAPI.js';
  
  export default {
    name: 'Article',

    mixins: [api],

    props: ['guid'],

    data: () => ({
      moment,
      article: null,
      showFull: false
    }),

    computed: {
      items() {
        return this.$store.state.RSSItems;
      }
    },

    async created() {
      if(this.items.length === 0) {
        // Чтобы страница нормально обновлялась
        // при клике по рефреш, запросим здесь RSS
        try {
          let response = await this.apiGetRSS();

          this.$store.commit('setRSSItems', {
            items: response.data.items
          });

        } catch(err) {
          console.error(err);
        }
      }

      // Находим статья по полученному GUID
      this.article = this.items
        .find(i => i.guid === this.guid);
    }
  }
</script>
<style lang="scss" scoped>
  a {
    word-wrap: break-word;
  }

  .close-button {
    position: fixed;
    top: 14px;
    right: 24px;
  }
</style>