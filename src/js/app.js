"use strict";

import '../sass/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Notepad from './components/Notepad';
import ListNoteTemplate from './listnotetemplate';
import schema from './1schema';

// создаем список блокнотов для создания кнопок выбора
var listBtnNote = ListNoteTemplate.map((Arr, idx) => ({
     id: idx.toString(),
     label: Arr[0].titlenote, 
     type: 'button'})  );

ReactDOM.render(
  <div > 
   
    <Notepad initialListnotetemplate={ListNoteTemplate} initialListBtnNote={listBtnNote}/>
    <div className="app-footer">
       <span>The Note as Universal notepad.</span>
       <p>Copyright © 2017–2019 Karmov Marat, CA.</p>
    </div>
  </div>,
  document.getElementById('pad')
);
