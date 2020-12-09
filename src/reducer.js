export default function reducer(state, action) {
  return {
    ...state,
    [action.type]: action.payload,
  };
}
