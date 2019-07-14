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
  }
};
