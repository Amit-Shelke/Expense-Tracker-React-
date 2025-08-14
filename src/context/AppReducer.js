export default (state, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: Array.isArray(action.payload) ? action.payload : []
      }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => {
          if (t.id !== action.payload.id) return t;
          return { ...t, ...action.payload.update };
        })
      }
    default:
      return state;
  }
}