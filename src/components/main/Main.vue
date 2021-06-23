<!-- Компонент с заголовками новостей -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" xl="6">

        <!-- Фильтр по дате -->
        <div
          :class="{
            'd-inline-flex': $vuetify.breakpoint.mdAndUp,
            'd-block': $vuetify.breakpoint.smAndDown}">
          <v-menu ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="date
                  ? moment(date).format('DD.MM.YY') : ''"
                label="Фильтр по дате"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense>
              </v-text-field>
            </template>
            <v-date-picker v-model="date"
              :full-width="$vuetify.breakpoint.smAndDown"
              no-title
              scrollable>
              <v-spacer></v-spacer>
              <v-btn text
                color="primary"
                @click="menu = false">
                Отмена
              </v-btn>
              <v-btn text
                color="primary"
                @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>

        <!-- Поиск по совпадению слов в заголовке новостей -->
        <div
          :class="{
            'd-inline-flex ml-3': $vuetify.breakpoint.mdAndUp,
            'd-block': $vuetify.breakpoint.smAndDown}">
          <v-text-field v-model="search"
            prepend-icon="search"
            label="Поиск"
            dense></v-text-field>
        </div>
      </v-col>
    </v-row>

    <!-- Собственно, новости -->
    <v-row v-for="(n, i) in visibleNews" :key="i"
      justify="center">
      <v-col cols="12" md="8" xl="6">
        <v-row class=" d-flex">
          <v-col cols="12 pt-0 pb-4">
            <p class="mb-0">
              <small>
                {{moment(n.pubDate).format('DD.MM.YY mm:hh')}}
              </small>
            </p>
            
            <!-- Заголовок -->
            <p class="text-subtitle-1 text-md-h4 mb-0">
              <a :href="`/#/article?guid=${n.guid}`"
                class="news-app-link">
                {{n.title}}
              </a>
            </p>

            <p class="mb-0 text-caption text-md-subtitle-1">
              {{n.description}}
            </p>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
    
    <v-row justify="center">
      <v-col>
        <v-pagination v-model="page"
          @input="changePage($event)"
          :length="pagesTotal">
        </v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import api from '@/api/GetRSSAPI.js';
  import moment from 'moment';
  
  export default {
    name: 'Main',

    mixins: [api],

    data: () => ({
      moment,
      visibleNews: [],
      pagesTotal: 0,
      page: 1,
      menu: false,
      date: null
    }),

    computed: {
      items() {
        return this.$store.state.RSSItems;
      }
    },

    methods: {
      async getData() {
        try {
          let response = await this.apiGetRSS();

          // Сортируем от более новых к более старым
          response.data.items.sort((a, b) => {
            if(new Date(a.pubDate) > new Date(b.pubDate)) {
              return -1;
            
            } else return 1;
          });

          this.$store.commit('setRSSItems', {
            items: response.data.items
          });

          this.visibleNews = response.data.items;

          // Посчитаем количество страниц
          let pages = Math.floor(
            response.data.items.length / 5);

          if(response.data.items.length % 5 > 0) pages++;

          this.pagesTotal = pages;

          // Выводим первую страницу
          this.changePage();

          console.log(this.visibleNews);

        } catch(err) {
          console.error(err);
        }
      },

      changePage(event) {
        this.visibleNews = this.items
          .slice(this.page - 1, this.page + 5)
      }
    },

    created() {
      this.getData();

      // parser.parseStringPromise('http://static.feed.rbc.ru/rbc/logical/footer/news.rss')
      // .then(function (result) {
      //   console.dir(result);
      //   console.log('Done');
      // })
      // .catch(function (err) {
      //   console.error('Ошибка парсинга XML');
      // });
    }
  }
</script>
