export default {
  namespaced: true,
  state: {
    global: {},
    tool: {},
  },
  mutations: {
    setOption(state, { namespace, key, value }) {
      state[namespace] = {
        ...state[namespace],
        [key]: value,
      };
    },
    clearToolOptions(state) {
      state.tool = {};
    },
  },
  actions: {
    setOption({
      getters, commit, dispatch, state,
    }, { name, value, global = false }) {
      const namespace = getters.namespace(global);
      commit('setOption', { namespace, key: name, value });

      dispatch('paint/setToolOptions', { ...state.global, ...state.tool }, { root: true });
    },
    selectTool({ commit, getters }, options) {
      commit('clearToolOptions');
      options.forEach((option) => {
        const value = option.value || getters.optionValue(option) || option.default;

        commit('setOption', {
          namespace: getters.namespace(option.global),
          key: option.name,
          value,
        });
      });
    },
  },
  getters: {
    namespace: () => (global) => (global ? 'global' : 'tool'),
    optionValue: (state, getters) => ({ name, global }) => state[getters.namespace(global)][name],
  },
};
