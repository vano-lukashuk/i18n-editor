import Module from '@/store/utils/module'
import _ from 'lodash'
import fs from "fs";
import utilsFile from "@/utils/files";

const patternFiles = /\.(js|vue)$/;
const patternKey = /\$t\(((?:"[^"]*")|(?:`[^`]*`)|(?:'[^']*'))/igm;

const debug = process.env.NODE_ENV !== 'production';


const initialState = () => ({
  projectPath: null,
  sourceRoot: null,
  languagesSourceRoot: null,

  patternFiles: patternFiles,
  patternKey: patternKey,
});

const state = initialState();
const mutations = {
  setProjectPath(state, path) { state.projectPath = path},
  setSourceRoot(state, path) { state.sourceRoot = path},
  setLanguagesSourceRoot(state, path) { state.languagesSourceRoot = path},
  patternFiles(state, pattern) { state.patternFiles = pattern},
  patternKey(state, pattern) { state.patternKey = pattern},

  loadProject(state, project) {
    state.sourceRoot = project && project.sourceRoot;
    state.languagesSourceRoot = project && project.dir && project.dir.langs;
  }
};
const getters = {
  projectPath(state) { return state.projectPath; },
  sourceRoot(state) { return state.sourceRoot; },
  languagesSourceRoot(state) { return state.languagesSourceRoot; },
  patternFiles(state) { return state.patternFiles; },
  patternKey(state) { return state.patternKey; },

  _project(state) {
    return {
      sourceRoot: state.sourceRoot,
      dir: {
        langs: state.languagesSourceRoot,
      }
    }
  }
};
const actions = {
  init({dispatch}) {
    if (debug) {
      const projectPath = 'D:/GIT/i18n-editor/1.edit';
      dispatch('loadProject', projectPath)
    }
  },
  selectedSourceRoot({commit, getters}, path) {
    commit('setSourceRoot', path);
    let file = utilsFile(path, getters.patternFiles, getters.patternKey);
    commit('files/fileLoaded', file, {root: true});
  },
  selectedLanguagesSourceRoot({commit, dispatch}, path) {
    commit('setLanguagesSourceRoot', path);
    dispatch('files/loadLanguages', path, {root: true});
  },

  loadProject({commit, dispatch, getters}, path) {
    try {
      let projectContent = fs.readFileSync(path, "UTF-8");
      let project = JSON.parse(projectContent);
      commit('loadProject', project);
      commit('setProjectPath', path);

      if (getters.sourceRoot) {
        dispatch('files/fileLoaded', {
          sourceRoot: getters.sourceRoot,
          patternFiles: getters.patternFiles,
          patternKey: getters.patternKey,
        }, {root: true});
      }

      if (getters.languagesSourceRoot) {
        dispatch('files/loadLanguages', getters.languagesSourceRoot, {root: true});
      }
    } catch (e) {
      throw e;
    }
  },
  saveProject({getters}, path) {
    try {
      fs.writeFileSync(path, JSON.stringify(getters._project));
    } catch (e) {
      throw e;
    }
  },
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
