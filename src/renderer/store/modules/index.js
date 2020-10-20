import camelCase from 'lodash/camelCase';
const requireModule = require.context('.', true, /(?<!\.\/)index\.js$/);


console.log("Vuex install module", requireModule.keys());
const modules = {};
requireModule.keys().forEach(fileName => {
  console.log(fileName);
  if (/\.unit\.js$/.test(fileName)) return;

  modules[camelCase(fileName.split('/')[1].replace(/(\.\/|\.js)/g, ''))] = {
    namespaced: true,
    ...(requireModule(fileName).default || requireModule(fileName))
  };
});
export default modules;
