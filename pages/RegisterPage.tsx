'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  async function handleSubmit() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email, name }),
    })

    if (response.ok) {
      router.push('/authen/login')
    } else {
      console.log("error :" ,await response.json())
    }
  }

  return (
    <div className='w-[60%] mx-auto'>
      <div className='w-[65%] mx-auto'>
        <div className='mt-8'>
          <label htmlFor="username">Username</label>
          <input 
            type="username" 
            name="username" 
            placeholder="username" 
            required 
            className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mt-8'>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mt-8'>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mt-8'>
          <label htmlFor="name">Name</label>
          <input 
            type="name" 
            name="name" 
            placeholder="name" 
            required 
            className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className='bg-blue-500 text-white w-full p-2 mt-8 rounded-lg hover:bg-blue-600' 
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  )
}
