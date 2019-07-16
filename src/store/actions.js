export default {
  setViewport({ commit }, viewportDimensions) {
    // Set viewport dimensions and return thenable object
    return new Promise(resolve => {
      commit("setViewportWidth", viewportDimensions.width);
      commit("setViewportHeight", viewportDimensions.height);
      commit("setRows");
      commit("setColumns");
      resolve();
    });
  },
  checkIfWordExists({ state }, word) {
    // Check if word exists and return Promise with boolean value
    return new Promise(resolve => {
      resolve(
        state.hiddenWords.some(hiddenWord => {
          return word === hiddenWord.word;
        })
      );
    });
  }
};
