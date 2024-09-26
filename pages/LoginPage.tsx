'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import GoogleButton from '@/components/auth/GoogleButton'

export default function LoginPage() {
  const router = useRouter()
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    console.log(username, password)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username :username, password : password }),
    })
    const data = await response.json()
    if (response.ok) {
      router.push('/')
      window.localStorage.setItem('avatar', data.data.Avatar)
      window.localStorage.setItem('accountId', data.data.accountId)
      window.localStorage.setItem('name', data.data.name)
      window.localStorage.setItem('token',data.data.token)
    } else {
      console.log("error :" ,data)
    }
  }

  return (
    <div className='w-[60%] mx-auto'>
      <div className='w-[65%] mx-auto'>
        <div className='mt-8'>
          <label htmlFor="username">Email</label>
          <input 
            type="username" 
            name="username" 
            placeholder="Email" 
            required 
            className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'
            value={username}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className='flex justify-between mt-4'>
          <div className='flex gap-4'>
            <p>Remember me</p>
            <input type="checkbox" name="" id="" />
          </div>
          <p>Forgot password?</p>
        </div>
        <button 
          type="submit" 
          className='bg-blue-500 text-white w-full p-2 mt-8 rounded-lg hover:bg-blue-600' 
          onClick={handleSubmit}
        >
          Login
        </button>
        <GoogleButton />
      </div>
    </div>
  )
}
