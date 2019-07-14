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
  }
};
