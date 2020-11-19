import Vue from 'vue';
import VueRouter from 'vue-router';

const requireRouter = require.context('.', true, /(?<!\.\/)index\.js$/);
let routers = []
requireRouter.keys().forEach(fileName => {
  if (/\.unit\.js$/.test(fileName)) return;

  let _routes = requireRouter(fileName).default || requireRouter(fileName)
  routers.push(..._routes);
});

Vue.use(VueRouter);

const children = [
  ...routers,
  {
    path: '*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "pages/404" */ '@/views/pages/errors/404')
  },
];

const r = new VueRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  mode: 'history',
  fallback: !1,
  routes: children
});

export default r;
