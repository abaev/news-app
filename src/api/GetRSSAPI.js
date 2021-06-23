// Получаем RSS

import axios from 'axios';
// import fetch from 'cross-fetch';

const api = {
  methods: {
    apiGetRSS() {
      return axios({
        method: 'get',
        url: `https://api.rss2json.com/v1/api.json?rss_url=http://static.feed.rbc.ru/rbc/logical/footer/news.rss`
      });
    }
  }
};

export default api;
