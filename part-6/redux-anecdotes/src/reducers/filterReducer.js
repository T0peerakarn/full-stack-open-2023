const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'UPDATE':
      return action.payload
    default:
      return state
  }
}

export default reducer

export const updateFilter = (filter) => {
  return {
    type: 'UPDATE',
    payload: filter
  }
}