import tools from '@/sites/paint/tools';

import options from './options';

export default {
  state: {
    tool: null,
    toolClass: null,
    toolSettings: {},
  },
  mutations: {
    setToolSettings(state, settings) {
      state.toolSettings = settings;
    },
    setToolClass(state, toolClass) {
      state.toolClass = toolClass;
    },
    setTool(state, tool) {
      state.tool = tool;
    },
  },
  actions: {
    selectTool({ state, dispatch, commit }, toolName) {
      const toolClass = tools[toolName];

      if (!state.tool || !(state.tool instanceof toolClass)) {
        if (state.tool) {
          state.tool.cancel();
          commit('setTool', null);
        }

        commit('setToolClass', toolClass);

        dispatch('options/selectTool', toolClass.options);

        const tool = new toolClass({ ...state.toolSettings, ...state.options.global, ...state.options.tool });
        commit('setTool', tool);
      }
    },
    setToolSettings({ commit }, settings) {
      commit('setToolSettings', settings);
    },
    setToolOptions({ state }, options) {
      state.tool.setOptions(options);
    },
  },
  modules: {
    options,
  },
};
