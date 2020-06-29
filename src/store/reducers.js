import defaultState from './state';
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'clientWidth':
      return { ...state, clientWidth: action.data };
    case 'clientHeight':
      return { ...state, clientHeight: action.data };
    default:
      return state;
  }
};