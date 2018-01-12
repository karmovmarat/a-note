"use strict";

import '../sass/bundle_styles.scss';
import Logo from './components/Logo';
import Footer from './components/Footer';
import React from 'react';
import ReactDOM from 'react-dom';
import Whinepad from './components/Whinepad';
import schema from './1schema';
import NavPan from './components/NavPan';

let data = null;// JSON.parse(localStorage.getItem('data'));

// default example data, read from the schema
if (!data) {
  data = {};
  schema.forEach((item) => data[item.id] = item.sample);
  data = [data];
}

ReactDOM.render(
  <div >
    <div className="app-header">
       <Logo/> 300 БЛОКНОТ !
    </div>
    <NavPan/>
   
    <Whinepad initialSchema={schema} initialData={data} />
    <div className="app-footer">
      <Footer/> Подвал ! !   04 November -23 decem 2017 year
    </div>
  </div>,
  document.getElementById('pad')
);
