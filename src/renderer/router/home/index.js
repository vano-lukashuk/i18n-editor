export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "pages/home" */ '@/views/pages/home/index'),
  }
]
