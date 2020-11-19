import Vue from 'vue'
import Module from '@/store/utils/module'
import _ from 'lodash'
import utilsFile, {loadLanguages, saveLanguages} from "@/utils/files";

const initialState = () => ({
  files: null,
  selectedKey: '',
  languages: [],
  languagesData: null,
  translateMap: {},
});

const state = initialState();
const mutations = {
  fileLoaded (state, data) { state.files = data; },
  selectedKey (state, key) { state.selectedKey = key},
  setLanguagesData (state, data) { state.languagesData = data },
  setLanguages (state, languages) { state.languages = languages || []},
  changedLanguagesData (state, { value, key, lang }) {
    if (!state.languagesData[lang]) {
      Vue.set(state.languagesData, lang, {});
    }
    Vue.set(state.languagesData[lang], key, value);
  }
};
const getters = {
  files(state) {
    return state.files && state.files.reduce((acc, v) => {
      acc[v.file] = v;
      return acc;
    }, {})
  },
  keys(state) {
    let res = state.files && state.files.reduce((acc, v) => {
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

    Object.keys(state.languagesData).forEach(el => {
      let langRes = Object.keys(state.languagesData[el]).reduce((acc, key) => {
        acc[key] = {
          key: key,
          length: key.length
        };
        return acc
      }, {})
      _.merge(res, langRes);
    })
    return res;
  },
  selectedKey (state) {return state.selectedKey},
  languages (state) {return state.languages},
  languagesData (state) {return state.languagesData}
};
const actions = {
  init ({ commit, dispatch, getters }) {
  },
  selectedKey ({ commit }, key) {
    commit('selectedKey', key);
  },
  changedLangsData ({ commit }, data) {
    commit('changedLangsData', data)
  },
  loadLanguages ({ commit }, languagesSourceRoot) {
    let res = loadLanguages(languagesSourceRoot);
    commit('setLanguagesData', res);
    commit('setLanguages', Object.keys(res))
  },
  saveLanguages ({ getters }, languagesSourceRoot) {
    let res = saveLanguages(languagesSourceRoot, getters.langsData);
    console.log(res);
  },
  fileLoaded ({ commit }, { sourceRoot, patternFiles, patternKey }) {
    let file = utilsFile(sourceRoot, patternFiles, patternKey);
    commit('fileLoaded', file);
  },

  changedLanguagesData ({ commit }, data) {
    commit('changedLanguagesData', data)
  },
  addLanguages ({ commit }, languages) {

  }
};

const store = _.merge({
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}, Module(initialState));
console.log(store.actions)
export default store;
