import React, { useState, useEffect , useContext } from 'react'
import Register from '../../pages/register/Register'
import Login from '../../pages/login/Login'
import { MyContext } from '../../context/Context'


function FunctionPage() {
  const { userInfo, setUserInfo, navigate, signup, setSignup , setShownav} = useContext(MyContext)
  
  setShownav(false)
  useEffect(() => {
    const user = localStorage.getItem("userInfo")
    if(user){
       setUserInfo(JSON.parse(user))
       setShownav(true)
        navigate("/")
    }
}, [navigate, setShownav])

  useEffect(() => {
    if (!signup) {
      setSignup("signup");
    }
  }, [ setSignup]);

  return (
    <div className='homepage w-screen h-screen flex-col bg-[#020202] text-white flex items-center justify-center overflow-hidden'>
      <div id="mockup" className='w-[90%] h-[100%] md:w-[70%] lg:w-[50%] xl:w-[30%] flex items-center border-2 border-[violet] justify-center flex-col py-5 rounded-xl md:h-[70%] lg:h-[60%] xl:h-[60%] overflow-y-auto'>
        <div id="btns" className='w-full flex items-center justify-around mt-[20px]'>
        <button onClick={() => setSignup("signup")} className={`w-[40%] md:w-[30%] lg:w-[25%] h-[40px] ${signup === "signup" ? "bg-[violet]": "bg-[#212529]" } text-white rounded-xl hover:bg-[violet]`}>Signup</button>
        <button onClick={() => setSignup("login")} className={`w-[40%] md:w-[30%] lg:w-[25%] h-[40px] ${signup === "login" ? "bg-[violet]" : "bg-[#212529]"} text-white rounded-xl hover:bg-[violet]`}>Login</button>
        </div>
      {signup && signup == "signup" ? <Register />: <Login/>}

      </div>
    </div>
  )
}

export default FunctionPage