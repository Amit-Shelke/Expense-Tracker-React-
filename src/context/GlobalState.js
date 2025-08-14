import React, { createContext, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer';
import { supabase } from '../lib/supabaseClient'

// Initial state
const initialState = {
  transactions: [],
  user: null
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setTransactions(transactions) {
    dispatch({
      type: 'SET_TRANSACTIONS',
      payload: transactions
    });
  }

  function setUser(user) {
    dispatch({
      type: 'SET_USER',
      payload: user
    });
  }
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
    persistDelete(id)
  }

  function addTransaction(transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    persistTransaction(transaction);
  }

  function updateTransaction(id, update) {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, update } });
    persistUpdate(id, update)
  }

  // Sync from Supabase on sign-in
  useEffect(() => {
    if (!state.user) return;
    (async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', state.user.id)
        .order('created_at', { ascending: false })
      if (!error && data) {
        setTransactions(data.map(row => ({ id: row.id, text: row.text, amount: row.amount, date: row.date })));
      }
    })()
  }, [state.user])

  async function persistTransaction(transaction) {
    if (!state.user) return;
    await supabase.from('transactions').insert({
      id: transaction.id,
      user_id: state.user.id,
      text: transaction.text,
      amount: transaction.amount,
      date: transaction.date || new Date().toISOString()
    })
  }

  async function persistUpdate(id, update) {
    if (!state.user) return;
    const payload = {}
    if (typeof update.text !== 'undefined') payload.text = update.text
    if (typeof update.amount !== 'undefined') payload.amount = update.amount
    if (typeof update.date !== 'undefined') payload.date = update.date
    if (Object.keys(payload).length === 0) return;
    await supabase.from('transactions').update(payload).eq('id', id).eq('user_id', state.user.id)
  }

  async function persistDelete(id) {
    if (!state.user) return;
    await supabase.from('transactions').delete().eq('id', id).eq('user_id', state.user.id)
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    user: state.user,
    deleteTransaction,
    addTransaction,
    updateTransaction,
    setTransactions,
    setUser
  }}>
    {children}
  </GlobalContext.Provider>);
}