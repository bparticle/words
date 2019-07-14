export default {
  setViewportWidth(state, w) {
    state.viewportWidth = w;
  },
  setViewportHeight(state, h) {
    state.viewportHeight = h;
  },
  setColumns(state) {
    state.columns = Math.floor(state.viewportWidth / state.elementSize);
    state.marginLeft = (state.viewportWidth % state.elementSize) / 2;
  },
  setRows(state) {
    state.rows = Math.floor(state.viewportHeight / state.elementSize);
    state.marginTop = (state.viewportHeight % state.elementSize) / 2;
  }
};
