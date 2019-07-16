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
  },
  setWord(state, word) {
    state.word = word;
  },
  createGrid(state, payload) {
    state.gridObjects.push(payload);
  },
  replaceGridItem(state, payload) {
    state.gridObjects.splice(payload.index, 1, payload.content);
  },
  deleteGrid(state) {
    state.gridObjects = [];
  },
  addHiddenWord(state, word) {
    state.hiddenWords.push({
      index: state.hiddenWords.length + 1,
      word: word
    });
  }
};
