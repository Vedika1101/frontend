import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Faq from './components/Faqs/Faq';
import Gigs from './pages/gigs/Gigs';
import MyGigs from './pages/myGigs/MyGigs';
import Orders from './pages/orders/Orders';
import Courses from './pages/Courses/Courses';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Add from './pages/add/Add';
import Gig from './pages/gig/Gig';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import "./index.css"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from './components/navbar/Navbar';
import FunctionPage from './pages/FunctionPage/FunctionPage';
import { MyContext } from './context/Context';
import Profilepage from './pages/ProfilePage/Profilepage';

function App() {
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    // First animation: smooth height transition
    gsap.to('.uuiii', {
      scrollTrigger: {
        trigger: ".home",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "10% top",
        end: "bottom bottom",
      },
      height: "70%", // Maintain consistent units
      ease: "power1.out" // Added easing for smoothness
    });
  
    // Second animation: background color change
    gsap.to('#contvid', {
      scrollTrigger: {
        trigger: ".viddabba",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "-30% top",
        end: "bottom bottom",
      },
      backgroundColor: "#1B1212",
      ease: "power1.out" // Added easing
    });
  
    // Third animation: position and border of .vds
    gsap.to('.vds', {
      scrollTrigger: {
        trigger: ".viddabba",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "-40% top",
        end: "bottom bottom",
      },
      position: "absolute",
      top: "20%", // Maintain consistent units
      left: "20%", // Maintain consistent units
      border: "2px solid rgb(58, 16, 120)", // Added commas for readability
      width: "60%",
      ease: "power1.out" // Added easing
    });
  
    // Fourth animation: opacity transition for text
    gsap.to('#traitextMaincont', {
      scrollTrigger: {
        trigger: ".viddabba",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "-20% top",
        end: "bottom 95%",
      },
      opacity: 1,
      ease: "power1.out" // Added easing
    });
  
    // Fifth animation: y-axis movement for mainslider
    gsap.to('#mainslider', {
      scrollTrigger: {
        trigger: ".viddabba",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "10% top",
        end: "60% top",
      },
      y: 280,
      ease: "power1.out", // Added easing for smooth movement
    });
  
    // Sixth animation: carousel name opacity and y-axis movement
    gsap.to('#carouselname', {
      scrollTrigger: {
        trigger: ".viddabba",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "102% top",
        end: "120% top",
      },
      opacity: 1,
      y: 0,
      ease: "power1.out" // Added easing
    });
  
    // Seventh animation: fade-in effect for FAQ section
    gsap.from('.faqtrans', {
      scrollTrigger: {
        trigger: "#faq",
        scrub: 0.3, // Increased scrub for smoother transition
        start: "0% 50%",
        end: "30% 50%",
      },
      stagger: 0.1, // Staggered effect for smooth entrance
      opacity: 0,
      ease: "power1.out" // Added easing
    });
  
    // Eighth animation: gallery items fade-in and move up
    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: ".gallery", // Ensure you have a trigger for this animation
        start: "top bottom", // Start when the gallery section is in view
        end: "top top",
      },
      y: 100,
      duration: 1,
      opacity: 0,
      ease: "power1.out" // Added easing
    });
  }, []);
  
  const {shownav , setShownav} = useContext(MyContext)
  return (
    <>
    {shownav && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/profile' element={<Profilepage/>}/>
      <Route path="/gigs" element={<Gigs />} />
      <Route path="/myGigs" element={<MyGigs />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/Courses" element={<Courses />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/message/:id" element={<Message />} />
      <Route path="/add" element={<Add />} />
      <Route path="/gig/:id" element={<Gig />} />
      <Route path="/function" element={<FunctionPage/>} />
      </Routes>
    </>
  );
}

export default App;
