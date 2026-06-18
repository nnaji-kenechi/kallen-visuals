import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'admin' && password === 'kallen2025') {
      navigate('/admin')
    } else {
      setError('Incorrect username or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E] px-6 -mt-[68px] pt-[68px]">
      <div className="bg-white rounded-xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl text-[#1A1A2E]">Kallen Visuals</h1>
          <p className="text-xs text-[#C9A96E] tracking-widest uppercase mt-1">Admin Portal</p>
        </div>

        <h2 className="text-center font-semibold text-[#1A1A2E] mb-6">Sign in to continue</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1A1A2E] mb-2">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="admin"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-[#1A1A2E] mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-[#C9A96E] text-[#1A1A2E] py-3 rounded font-semibold mt-4 hover:bg-[#1A1A2E] hover:text-white transition"
        >
          Sign In
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">Demo: admin / kallen2025</p>
      </div>
    </div>
  )
}
