import Header from './header/Header';
import LoggedHeader from './loggedHeader/LoggedHeader';
import Footer from './footer/Footer';
import WhatsAppBtn from './whatsAppBtn/WhatsAppBtn';
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  // Check login status whenever the route changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  // Also listen for storage changes (for multiple tabs)
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {isLoggedIn ? <LoggedHeader /> : <Header />}
      <div className="navbar-spacer" />
      <Outlet />
      <WhatsAppBtn />
      <Footer />
    </div>
  );
};

export default Layout;
