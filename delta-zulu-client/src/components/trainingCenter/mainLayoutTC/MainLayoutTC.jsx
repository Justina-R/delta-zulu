import React from 'react'
import Footer from "../../welcomeSite/mainLayout/footer/Footer"
import Header from "./header/Header"
import WhatsAppBtn from '../../welcomeSite/whatsAppBtn/WhatsAppBtn'
import { Outlet } from "react-router-dom";

const MainLayoutTC = () => {
  return (
    <>
    <Header/>
      <Outlet />
      <WhatsAppBtn />
    <Footer/>
    </>
  )
}

export default MainLayoutTC