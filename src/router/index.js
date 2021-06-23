import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/components/main/Main.vue';
import Article from '@/components/article/Article.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/'
	},

  {
    path: '/',
    name: 'Main',
    component: Main
  },

  {
    path: '/article',
    name: 'Article',
    component: Article,
    props: route => ({
      guid: route.query.guid
    })
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes
});

export default router;
