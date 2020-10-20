export default function (initialState){
  return {
    mutations:{
      RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
          state[key] = newState[key]
        });
      }
    },
    actions:{
      reset({commit}) {
        commit('RESET');
      }
    }
  }
}
