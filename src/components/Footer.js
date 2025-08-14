import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '24px', padding: '12px 0', borderTop: '1px solid #efefef' }}>
      <div>
        <Link to="/license" style={{ marginRight: '12px' }}>License</Link>
        <Link to="/terms">Terms</Link>
      </div>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
        © 2025 Amit Shelke. All rights reserved.
      </div>
    </div>
  )
}

export default Footer


