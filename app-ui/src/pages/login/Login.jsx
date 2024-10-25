import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../context/Context';
import { useToast } from '@chakra-ui/react';  // Import the useToast hook from Chakra UI

function Login() {
  const [datas, setdata] = useState({ email: '', password: '' });
  const { setUserInfo, navigate, setSignup, setShownav } = useContext(MyContext);
  const toast = useToast();  // Initialize the toast hook

  const handleChange = (event) => {
    setdata({ ...datas, [event.target.name]: event.target.value });
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = datas;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);
      console.log(userInfo) 
      if (data._id && data.email && data.name) {
        // Show a success toast when login is successful
        showToast("Login successful!", "success");
        navigate("/");
        setShownav(true)
      }

    } catch (error) {
      // Show an error toast when there's an issue
      showToast(
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "An error occurred while logging in. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className='w-[90%] h-[90%] my-[20px] bg-[violet] rounded-xl p-2 flex flex-col items-center justify-around'>
      <h1 className='text-white text-3xl font-bold font-sans'>Login</h1>
      <form onSubmit={sendData} className='w-full flex flex-col items-center'>
        <input
          name='email'
          onChange={handleChange}
          type='text'
          placeholder='Email'
          className='border-2 my-[3px] bg-black border-gray-200 p-2 w-full rounded-xl'
        />
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Password'
          className='border-2 my-[3px] bg-black border-gray-200 p-2 w-full rounded-xl mt-2'
        />
        <button
          type='submit'
          className='bg-blue-500 my-[8px] text-white p-2 rounded-xl w-full'
        >
          Login
        </button>
      </form>
      <p className='text-white text-sm mt-2'>
        Don't have an account?{" "}
        <a onClick={() => setSignup("signup")} className='text-blue-500 cursor-pointer'>
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default Login;
