import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState('')
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptainData({
        "email": email,
        "password": password
      })
      // console.log(captainData);
      setEmail('')
      setPassword('')
    }
  return (
    <div className='px-5 py-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form action="" onSubmit={(e) => { submitHandler(e) }}>
          <h3 className='text-lg font-medium mb-2'>Whats your email ? </h3>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='email@example.com' required className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' required className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>Join a fleet ? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login'>
        <button className='bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
