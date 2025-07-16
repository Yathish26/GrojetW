import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://192.168.1.35:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem('admintoken', data.token)
        navigation('/admin')
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError('Error occurred while logging in')
      console.error('Login error:', e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password" className="block text-gray-700 mb-2 mt-4">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
