import React from 'react'
import { Outlet } from "react-router";

import Header from './Componete/Header'
import Footer from './Componete/Footer'
const Leyout=()=> {
  return (
    <div>
        <div className='app-header'>
            <Header />
        </div>
        <div  className='app-body'>
            <Outlet />
        </div>
        <div className='app-footer'>
            <Footer />
        </div>
    </div>
    
  )
}

export default Leyout