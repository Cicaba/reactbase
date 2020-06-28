import defaultState from './state'
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'screenWidth':
      return { ...state, screenWidth: action.data };
    case 'screenHeight':
      return { ...state, screenHeight: action.data };
    default:
      return state;
  }
}