import Module from '@/store/utils/module'
import _ from 'lodash'

const initialState = () => ({
  projectFile: null,
  languagesDir: null,
  watchDir: null,

  patternFiles: / /,
  patternsKey: / /,
});

const state = initialState();
const mutations = {};
const getters = {};
const actions = {};

const store = _.merge({
  state,
  mutations,
  getters,
  actions
}, Module(initialState));
console.log(store.actions)
export default store;
