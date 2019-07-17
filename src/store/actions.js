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
  },
  hideWord({ state, commit }, payload) {
    if (payload.type === "horizontal") {
      for (var i = 0; i < state.word.length; i++) {
        const x = state.gridObjects[payload.content.elementNumber + i].row;
        const y = state.gridObjects[payload.content.elementNumber + i].column;
        const z =
          state.gridObjects[payload.content.elementNumber + i].elementNumber;
        commit("replaceGridItem", {
          index: payload.content.elementNumber + i,
          content: {
            elementNumber: z,
            elementId: x + "-" + y,
            row: x,
            column: y,
            rnd:
              Math.floor(10000 + Math.random() * 90000 + x * y) + "-" + x + y,
            isRandom: false,
            character: state.word[i],
            classes: [
              "character--nonrnd",
              "character--delay" + Math.floor(Math.random() * 10),
              "character--" + state.elementSize,
              "col-" + y,
              "row-" + x,
              "index-" + z
            ]
          }
        });
      }
    }
  }
};
