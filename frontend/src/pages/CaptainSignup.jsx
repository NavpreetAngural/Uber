import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      "fullName": {
        "firstName": firstName,
        "lastName": lastName
      },
      "email": email,
      "password": password
    })
    // console.log(userData);
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='px-5 py-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form action="" onSubmit={(e) => { submitHandler(e) }}>
          <h3 className='text-lg font-medium mb-2'>Whats our Captain's Name ? </h3>
          <div className='flex gap-4 mb-6'>
            <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} placeholder='First Name' required className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' />
            <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} placeholder='Last Name' required className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' />
          </div>
          <h3 className='text-lg font-medium mb-2'>Whats our Captain's email ? </h3>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='email@example.com' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full text-lg placeholder:text-base' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full text-lg placeholder:text-base' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>Already have an Account ? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
