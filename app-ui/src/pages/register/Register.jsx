import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../context/Context';
import { useToast } from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Switch } from "@chakra-ui/switch"; // Import Switch component

function Register() {
  const [datas, setdata] = useState({ email: '', password: '', name: '', bio: '' });
  const { setUserInfo, navigate, setSignup, setShownav, userInfo } = useContext(MyContext);
  const toast = useToast();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isSeller, setIsSeller] = useState(false); // Initialize isSeller state
  const handleClick = () => setShow(!show);

  const handleChange = (event) => {
    setdata({ ...datas, [event.target.name]: event.target.value });
    if (event.target.name === 'bio' && event.target.value.length > 100) {
      showToast("Bio cannot be more than 100 characters", "warning");
    }
  };

  const handleSellerToggle = () => {
    setIsSeller(!isSeller); // Toggle isSeller state
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "ddtkuyiwb");
      fetch("https://api.cloudinary.com/v1_1/ddtkuyiwb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, password, bio } = datas;

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:3000/api/user',
        {
          name,
          email,
          password,
          bio,
          img: pic, // Ensure the image URL is sent as 'img'
          isSeller, // Send isSeller value to backend
        },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);
      console.log(userInfo)
      if (data.name && data.email && data._id) {
        showToast("Registration successful!", "success");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      showToast(
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "An error occurred while registering. Please try again.",
        "error"
      );
    }
  };

  return (
    <VStack spacing="5px" align="stretch" height="110%" width="90%">
      <FormControl id="name" isRequired>
        <FormLabel color="green.400">Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          onChange={handleChange}
          bg="black" // Black background
          color="green.400" // Neon green text
          borderColor="green.400" // Neon green border
          _placeholder={{ color: "gray.500" }} // Placeholder color
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel color="green.400">Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          onChange={handleChange}
          bg="black" // Black background
          color="green.400" // Neon green text
          borderColor="green.400" // Neon green border
          _placeholder={{ color: "gray.500" }} // Placeholder color
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color="green.400">Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            bg="black" // Black background
            color="green.400" // Neon green text
            borderColor="green.400" // Neon green border
            _placeholder={{ color: "gray.500" }} // Placeholder color
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="green">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="bio">
        <FormLabel color="green.400">Bio</FormLabel>
        <Textarea
          placeholder="Enter Your Bio"
          name="bio"
          onChange={handleChange}
          bg="black" // Black background
          color="green.400" // Neon green text
          borderColor="green.400" // Neon green border
          _placeholder={{ color: "gray.500" }} // Placeholder color
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel color="green.400">Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          bg="black" // Black background
          color="green.400" // Neon green text
        />
      </FormControl>
      <FormControl id="isSeller">
        <FormLabel color="green.400">Are you a Gig Provider?</FormLabel>
        <Switch
          isChecked={isSeller}
          onChange={handleSellerToggle}
          colorScheme="green"
        />
      </FormControl>
      <Button
        colorScheme="green" // Neon green button
        width="100%"
        h="40px"
        style={{ marginTop: 15 }}
        onClick={sendData}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
      <p className="text-white text-sm mt-2">
        Already have an account?{' '}
        <a onClick={() => setSignup('login')} className="cursor-pointer text-blue-500">
          Login
        </a>
      </p>
    </VStack>
  );
}

export default Register;
