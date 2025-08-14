import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

export const Header = () => {
  const [dark, setDark] = useState(false)
  const { user, setUser } = useContext(GlobalContext)

  useEffect(() => {
    const saved = localStorage.getItem('theme-dark') === '1'
    setDark(saved)
    document.body.classList.toggle('dark', saved)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.body.classList.toggle('dark', next)
    localStorage.setItem('theme-dark', next ? '1' : '0')
  }

  const signOut = async () => {
    try {
      // Check if it's a local user
      if (user && user.isLocal) {
        // Clear local storage
        localStorage.removeItem('localUser')
        localStorage.removeItem('localPassword')
        setUser(null)
      } else {
        // Supabase signout
        const { supabase } = await import('../lib/supabaseClient')
        await supabase.auth.signOut()
        setUser(null)
      }
    } catch (e) {
      console.error('Sign-out error', e)
    }
  }

  return (
    <div>
      <h2><center>
        Simple Expense Tracker</center>
      </h2>
      <div style={{ textAlign: 'center', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
        <Link to="/" style={{ marginRight: '12px' }}>Home</Link>
        <button onClick={toggle} className="btn" style={{ width: 'auto', margin: 0, padding: '6px 10px' }}>{dark ? 'Light Mode' : 'Dark Mode'}</button>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div title={user.name || user.email} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #74c0fc, #9775fa)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                  {(user.name || user.email || 'U').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>Hello, <span style={{ fontWeight: 600, color: 'var(--text)' }}>{user.name || user.email}</span></span>
            </div>
            <button onClick={signOut} className="btn" style={{ width: 'auto', margin: 0, padding: '6px 10px' }}>Sign out</button>
          </div>
        )}
      </div>
    </div>
  )
}
