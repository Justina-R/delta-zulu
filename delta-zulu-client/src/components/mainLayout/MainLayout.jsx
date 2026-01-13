import Header from './header/Header';
import LoggedHeader from './loggedHeader/LoggedHeader';
import Footer from './footer/Footer';
import WhatsAppBtn from './whatsAppBtn/WhatsAppBtn';
import { Outlet } from "react-router-dom";

const Layout = () => {
  // CAMBIAR POR CONTEXTO DE AUTH
  const isLoggedIn = false; 

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
