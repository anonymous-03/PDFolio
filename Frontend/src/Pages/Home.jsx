
import React, { useContext } from 'react';
import Navbar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import HowItWorks from '../components/Landing/HowItWorks';
// import Templates from '../components/Landing/Templates';
// import ToastContextProvider,{ToastContext} from '../context/ToastContextProvider';

// import Toast from '../components/Landing/Toast'
// import { AnimatePresence } from 'framer-motion';
// import Pricing from '../components/Landing/Pricing';
// import Testimonials from '../components/Landing/Testimonials';
import Contact from '../components/Landing/Contact';
import Footer from '../components/Landing/Footer';
import ThemeSwitcher from '../components/Theme/ThemeSwitcher';
// import CTA from '../components/Landing/CTA';
// import Footer from '../components/Landing/Footer';


const LandingPage = () => {

  const {toast,setToast}=useContext(ToastContext);
  const removeToast = (id) => {
    setToast(prev => prev.filter(toast => toast.id !== id));
  };
  return (
    
      <div className="bg-transparent">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Templates /> */}
        {/* <Pricing /> */}
        {/* <Testimonials /> */}
        <Contact />
        <Footer/>
        <ThemeSwitcher />
      {/* // <CTA />
      // <Footer />  */}
      </div>
  );
};

export default LandingPage;