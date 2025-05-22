import React from 'react'
import logo from "../assets/images/logo.png"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 flex justify-between flex-col '>
                <img className='w-16 ml-8' src={logo} alt="" />
                <div className='bg-white py-5 px-5 pb-7'>
                    <h2 className='text-[30px] font-semibold' >Get started with Uber</h2>
                    <Link to="/login">
                        <button className='w-full bg-black text-white py-3 px-5 rounded-lg mt-5'>Continue</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
