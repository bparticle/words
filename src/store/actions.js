export default {
  setViewport({ commit }, viewportDimensions) {
    // Set viewport dimensions and return thenable object
    return new Promise(resolve => {
      commit("setWidth", viewportDimensions.width);
      commit("setHeight", viewportDimensions.height);
      commit("setRows");
      commit("setColumns");
      resolve();
    });
  }
};
