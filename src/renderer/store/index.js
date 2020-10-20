import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from "vuex/dist/logger";
import modules from './modules'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  strict: debug,
  devtools: debug,
  actions: {
    reset({commit}) {
      // resets state of all the modules
      Object.keys(modules).forEach(moduleName => {
        commit(`${moduleName}/RESET`);
      })
    }
  },
  plugins: debug ? [createLogger()] : []
});

console.log("Vuex install")
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store;
