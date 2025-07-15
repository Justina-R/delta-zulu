import Header from './header/Header'
import Footer from './footer/Footer'
import WhatsAppBtn from '../whatsAppBtn/WhatsAppBtn';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header />
      <div className="navbar-spacer" />
      <Outlet />
      <WhatsAppBtn />
      <Footer />
    </div>
  );
};

export default Layout;