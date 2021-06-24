import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		RSSItems: [],
	},

	mutations: {
		// Устанавливаем новые элемены из RSS
		setRSSItems(state, { items }) {
			state.RSSItems = items;
		}
	}
});