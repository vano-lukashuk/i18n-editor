export default [
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "pages/project" */ '@/views/pages/project/index'),
  }
]
