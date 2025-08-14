import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { setUser } = useContext(GlobalContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        console.log('Creating local account:', { email })
        
        // Create a simple local user object
        const newUser = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0], // Use part before @ as name
          avatarUrl: null,
          isLocal: true
        }
        
        // Store in localStorage for persistence
        localStorage.setItem('localUser', JSON.stringify(newUser))
        localStorage.setItem('localPassword', password) // In real app, hash this
        
        setMessage('Account created successfully!')
        setUser(newUser)
        onClose()
        
        setEmail('')
        setPassword('')
        
      } else {
        console.log('Attempting local signin:', { email })
        
        // Check if user exists locally
        const storedUser = localStorage.getItem('localUser')
        const storedPassword = localStorage.getItem('localPassword')
        
        if (storedUser && storedPassword === password) {
          const user = JSON.parse(storedUser)
          setMessage('Signed in successfully!')
          setUser(user)
          onClose()
        } else {
          setMessage('Invalid email or password. Please check your credentials.')
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--card-bg)',
        padding: '24px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--muted)' }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                color: 'var(--text)'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                color: 'var(--text)'
              }}
            />
          </div>

          {message && (
            <div style={{
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '8px',
              background: message.includes('error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)',
              color: message.includes('error') ? '#ff4444' : '#00aa00',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{ marginBottom: '16px' }}
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
