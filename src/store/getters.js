export default {
  getElementsH: state => {
    return state.columns;
  },
  getElementsV: state => {
    return state.rows;
  },
  totalElements: state => {
    return state.columns * state.rows;
  },
  getGridObjects: state => {
    return state.gridObjects;
  },
  getHiddenWords: state => {
    return state.hiddenWords;
  },
  binaryWord: state => {
    var b = [];
    for (var i = 0; i < state.word.length; i++) {
      b.push(1);
    }
    return b;
  },
  wordsCounter: state => {
    return state.hiddenWords.length;
  }
};
