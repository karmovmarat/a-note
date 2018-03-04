"use strict";

import '../sass/styles.scss';
//import Logo from './components/Logo';
//import Footer from './components/Footer';
import React from 'react';
import ReactDOM from 'react-dom';
import Whinepad from './components/Whinepad';
import ListNoteTemplate from './listnotetemplate';
import schema from './1schema';
//import NavPan from './components/NavPan';

let data = null;// JSON.parse(localStorage.getItem('data'));

// default example data, read from the schema
if (!data) {
  data = {};
  schema.forEach((item) => data[item.id] = item.sample);
  data = [data];
}
// создаем список блокнотов для создания кнопок выбора
var listBtnNote = ListNoteTemplate.map((Arr, idx) => ({
     id: idx.toString(),
     label: Arr[0].titlenote, 
     type: 'button'})  );

ReactDOM.render(
  <div > 
   
    <Whinepad initialListnotetemplate={ListNoteTemplate} initialListBtnNote={listBtnNote}/>
    <div className="app-footer">
       <span>The Note as Universal notepad.</span>
       <p>Copyright © 2017–2018 Karmov Marat, CA.</p>
    </div>
  </div>,
  document.getElementById('pad')
);
