import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
	iconfont: 'md',
	lang: {
    locales: { ru },
    current: 'ru',
  }
});
