import defaultState from './state';
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'clientWidth':
      return { ...state, clientWidth: action.data };
    case 'clientHeight':
      return { ...state, clientHeight: action.data };
    case 'selectedNav':
      return { ...state, selectedNav: action.data };
    case 'user':
      return { ...state, user: action.data };
    case 'school':
      return { ...state, school: action.data };
    case 'rote':
      return { ...state, rote: action.data };
    case 'enum':
      return { ...state, enum: action.data };
    default:
      return state;
  }
};