import Module from '@/store/utils/module'
import _ from 'lodash'
import utilsFile, {loadLangs, saveLangs} from "@/utils/files";


const initialState = () => ({
  files: null,
  selectedKey: '',
  langs:[],
  langsData: null,
});

const state = initialState();
const mutations = {
  fileLoaded(state, data) {
    state.files = data;
  },
  selectedKey(state, key) {
    state.selectedKey = key
  },
  setLangsData(state, data){
    state.langsData = data
  },
  setLangs(state, langs){
    state.langs = langs || []
  }
};
const getters = {
  files(state) {
    return state.files.reduce((acc, v) => {
      acc[v.file] = v;
      return acc;
    }, {})
  },
  keys(state) {
    return state.files.reduce((acc, v) => {
      v.finded.forEach(el => {
        let key = el.groups.slice(1, -1);
        let res = acc[key] = acc[key] || {
          key: key,
          length: key.length,
          value: {}
        }
        res.value[v.file] = res.value[v.file] || [];
        res.value[v.file].push(el.index + el.full.indexOf(el.groups) + 1)
      })
      return acc;
    }, {})
  },
  selectedKey(state){return state.selectedKey},
  langs(state){return state.langs},
  langsData(state){return state.langsData}
};
const actions = {
  init({commit, dispatch}) {
    commit('fileLoaded', utilsFile());
    dispatch('loadLangs')
    dispatch('saveLangs')
  },
  selectedKey({commit}, key){
    commit('selectedKey', key);
  },
  loadLangs({commit}){
    let res = loadLangs('D:/GIT/i18n-editor/assets');
    commit('setLangsData', res);
    commit('setLangs', Object.keys(res))
  },
  saveLangs({getters}){
    let res = saveLangs('D:/GIT/i18n-editor/assets', getters.langsData);
    console.log(res);
  }
};

const store = _.merge({
  state,
  mutations,
  getters,
  actions
}, Module(initialState));
console.log(store.actions)
export default store;
