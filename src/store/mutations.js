export default {
  setWidth(state, w) {
    state.viewportWidth = w;
  },
  setHeight(state, h) {
    state.viewportHeight = h;
  },
  setColumns(state) {
    state.columns = ~~(state.viewportWidth / state.elementSize);
  },
  setRows(state) {
    state.rows = ~~(state.viewportHeight / state.elementSize);
  }
};
