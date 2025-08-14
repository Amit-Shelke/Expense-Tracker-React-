import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { supabase } from './lib/supabaseClient'
import { GlobalContext, GlobalProvider } from './context/GlobalState'

const WithAuth = () => {
  const { setUser } = React.useContext(GlobalContext)
  useEffect(() => {
    // Check for local user first
    const localUser = localStorage.getItem('localUser')
    if (localUser) {
      setUser(JSON.parse(localUser))
      return
    }
    
    // Then check Supabase auth
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user
      setUser(user ? {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name || user.email,
        avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null
      } : null)
    })
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user
      setUser(user ? {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name || user.email,
        avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null
      } : null)
    })
    return () => subscription.subscription.unsubscribe()
  }, [setUser])
  return <App />
}

ReactDOM.render(
  <GlobalProvider>
    <WithAuth />
  </GlobalProvider>,
  document.getElementById('root')
);
