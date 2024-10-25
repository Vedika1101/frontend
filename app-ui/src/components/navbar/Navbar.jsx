import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { MyContext } from "../../context/Context";

function Navbar() {
  const { userInfo, navigate ,setUserInfo } = useContext(MyContext)
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const translations = {
    English: {
      search_placeholder: "Search",
      courses: "Courses",
      explore: "Explore",
      english: "English",
      spanish: "Español",
      hindi: "हिन्दी",
      tamil: "தமிழ்",
      bengali: "বাংলা",
      telugu: "తెలుగు",
      login: "Login",
      signup: "Signup",
      signIn: "Sign in",
      logout: "Logout",
      gigs: "Gigs",
      addNewGig: "Add New Gig",
      orders: "Orders",
      messages: "Messages"
    },
    Spanish: {
      search_placeholder: "Buscar Gig",
      courses: "Cursos",
      explore: "Explorar",
      english: "Inglés",
      spanish: "Español",
      hindi: "हिन्दी",
      tamil: "தமிழ்",
      bengali: "বাংলা",
      telugu: "తెలుగు",
      login: "Iniciar sesión",
      signup: "Regístrate",
      signIn: "Iniciar sesión",
      logout: "Cerrar sesión",
      gigs: "Gigs",
      addNewGig: "Agregar nuevo Gig",
      orders: "Pedidos",
      messages: "Mensajes"
    },
    Hindi: {
      search_placeholder: "गिग खोजें",
      courses: "पाठ्यक्रम",
      explore: "अन्वेषण करें",
      english: "अंग्रेज़ी",
      spanish: "Español",
      hindi: "हिन्दी",
      tamil: "தமிழ்",
      bengali: "বাংলা",
      telugu: "తెలుగు",
      login: "लॉग इन करें",
      signup: "साइन अप करें",
      signIn: "साइन इन करें",
      logout: "लॉग आउट",
      gigs: "गिग्स",
      addNewGig: "नया गिग जोड़ें",
      orders: "आदेश",
      messages: "संदेश"
    },
    Tamil: {
      search_placeholder: "கிக்களைத் தேடுங்கள்",
      courses: "பாடநெறிகள்",
      explore: "ஆராயுங்கள்",
      english: "ஆங்கிலம்",
      spanish: "Español",
      hindi: "हिन्दी",
      tamil: "தமிழ்",
      bengali: "বাংলা",
      telugu: "తెలుగు",
      login: "உள்நுழைய",
      signup: "பதிவு செய்க",
      signIn: "உள்நுழைய",
      logout: "வெளியேறு",
      gigs: "கிக்ஸ்",
      addNewGig: "புதிய கிகைச் சேர்க்கவும்",
      orders: "ஆணைகள்",
      messages: "செய்திகள்"
    },
    Bengali: {
      search_placeholder: "গিগ খুঁজুন",
      courses: "কোর্স",
      explore: "অন্বেষণ করুন",
      english: "ইংরেজি",
      spanish: "Español",
      hindi: "हिन्दी",
      tamil: "தமிழ்",
      bengali: "বাংলা",
      telugu: "తెలుగు",
      login: "লগ ইন করুন",
      signup: "নিবন্ধন করুন",
      signIn: "সাইন ইন করুন",
      logout: "লগ আউট",
      gigs: "গিগস",
      addNewGig: "নতুন গিগ যোগ করুন",
      orders: "অর্ডার",
      messages: "বার্তা"
    },
    Telugu: {
      search_placeholder: "గిగ్‌ను వెతకండి",
      courses: "కోర్సులు",
      explore: "అన్వేషించండి",
      english: "ఆంగ్లం",
      spanish: "Español",
      hindi: "हिन्दी",
      tamil: "தமிழ்",
      bengali: "বাংলা",
      telugu: "తెలుగు",
      login: "లాగిన్ చేయండి",
      signup: "సైన్ అప్ చేయండి",
      signIn: "సైన్ ఇన్ చేయండి",
      logout: "లాగ్ అవుట్",
      gigs: "గిగ్స్",
      addNewGig: "కొత్త గిగ్ జోడించండి",
      orders: "ఆర్డర్లు",
      messages: "సందేశాలు"
    }
  };

  useEffect(()=>{
    let inputtt = document.querySelector(".inputt")
    let btun = document.querySelector(".btun")
    inputtt.addEventListener("focus",()=>{btun.style.height = "50px";btun.style.top ="0px";btun.style.width ="125px";})
    inputtt.addEventListener("blur",()=>{btun.style.height = "37px";btun.style.top ="0px";btun.style.width ="100px";})

  },[])
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 700 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const translatePage = (language) => {
    setCurrentLanguage(language); // Update current language
    setOpen(false); // Close language options
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container relative">
        <div id="searchcont" className="absolute left-[50%] h-fit translate-x-[-50%]">
        <input type="text" className="inputt w-[300px] z-50 px-5 py-3 h-[35px] rounded-xl relative text-black" placeholder={translations[currentLanguage].search_placeholder}></input>
        <button className="px-5 btun py-1 h-[37px] w-[100px] translate-x-[-20px] translate-y-[-2px] rounded-xl relative z-[100] bg-[#8256bc]">{translations[currentLanguage].search_placeholder}</button>

        </div>
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Gigमित्र</span>
          </Link>
          <span className="dot ">.</span>
        </div>
        <div className="links">
          <span>
            <Link to="/courses">
            {translations[currentLanguage].courses}
            </Link></span>
            <Link to="/gigs">
          <span>{translations[currentLanguage].explore}</span>
            </Link>
          <span className="cursor-pointer" onClick={() => setOpen2(!open2)}>{currentLanguage}</span>
          {open2 && (
            <div className="language-options gap-5 flex flex-col absolute top-[60%] right-[3%] bg-[#181818] text-white p-5 rounded-xl shadow-xl">
              <span className="cursor-pointer" onClick={() => translatePage('English')}>{translations[currentLanguage].english}</span>
              <span className="cursor-pointer" onClick={() => translatePage('Spanish')}>{translations[currentLanguage].spanish}</span>
              <span className="cursor-pointer" onClick={() => translatePage('Hindi')}>{translations[currentLanguage].hindi}</span>
              <span className="cursor-pointer" onClick={() => translatePage('Tamil')}>{translations[currentLanguage].tamil}</span>
              <span className="cursor-pointer" onClick={() => translatePage('Bengali')}>{translations[currentLanguage].bengali}</span>
              <span className="cursor-pointer" onClick={() => translatePage('Telugu')}>{translations[currentLanguage].telugu}</span>
            </div>
          )}
          {userInfo ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={userInfo?.img}
                alt=""
              />
              <span>{userInfo?.name}</span>
              {open && <div className="options">
                {userInfo.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      {translations[currentLanguage].gigs}
                    </Link>
                    <Link className="link" to="/add">
                      {translations[currentLanguage].addNewGig}
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  {translations[currentLanguage].orders}
                </Link>
                <Link className="link" to="/messages">
                  {translations[currentLanguage].messages}
                </Link>
                <Link className="link" to="/" onClick={() => {
                  localStorage.removeItem("userInfo");
                  setUserInfo(null)
                }}>
                  {translations[currentLanguage].logout}
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link className="cursor-pointer" to="/function">{!userInfo && translations[currentLanguage].signIn}</Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
        </>
      )}
    </div>
  );
}

export default Navbar;
