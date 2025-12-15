import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch('/api/')
      .then(res => res.json())
      .then(data => setMessage(data.Hello))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>SecondGen Platform</h1>
      <div className="card">
        <p>Backend says: {message || 'Loading...'}</p>
      </div>
    </>
  )
}

export default App
