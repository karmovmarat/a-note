"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Footer from './components/Footer';

import NavPan from './components/NavPan';

var  Appfooter = {
  backgroundColor: "#407CA8",
  color: "#F0F0F0",
  fontFamily: "'Norican', cursive",
  fontSize: "26px",
  fontStyle: "normal",
  fontWeight: "700",
  margin: "0",
  padding: "20px 20px 20px 14px",
  verticalAlign: "middle",
}


ReactDOM.render(



  <div>

    <div className="app-header" style={Appfooter}>
      <Logo/> тест бутстрап
    </div>
    
    <div>
         <NavPan />
    </div>

   
    <div className="Appfooter">
      <Footer/> Подвал ! !   04 November 2017 year
    </div>

  </div>,
  document.getElementById('pad')
);
