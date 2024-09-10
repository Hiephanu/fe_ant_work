'use client'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if (response.ok) {
      router.push('/')
    } else {
    }
  }
 
  return (
    <form onSubmit={handleSubmit} className='w-[60%] mx-auto'>
      <div className='w-[75%] mx-auto'>
        <div className='mt-8'>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" required className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'/>
        </div>
        <div className='mt-8'>
          <label htmlFor="password" >Password</label>
          <input type="password" name="password" placeholder="password" required className='w-full border-black-500 border-2 rounded-lg px-4 py-2 mt-2'/>
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}