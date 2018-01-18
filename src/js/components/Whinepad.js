/*import from react-bootstrap */
import Button from 'react-bootstrap/lib/Button';
//import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';

import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Modal from 'react-bootstrap/lib/Modal';
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import ModalTitle from 'react-bootstrap/lib/ModalTitle';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ModalFooter from 'react-bootstrap/lib/ModalFooter';

/*import from react */ 
//import Button from './Button'; 
// import NavPanBs4 from './NavPanBs4'; // удаляем

import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';
import React, {Component, PropTypes} from 'react';

class Whinepad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      addnew: false,
      addnewBs3: false,
      showModal: false, //for react-bootstrap BS3
      schema: props.initialSchema,
      titlenote: props.initialSchema[0].titlenote,
      expanded: true,
      collapseOnSelect: true,
    };
    this._preSearchData = null;
  }
  
  _addNewDialog() {
    this.setState({addnew: true});
  }

  _addNewDialogBs3() {
    this.setState({addnewBs3: true});
  }

  _close() {
    this.setState({ showModal: false });
  }

  _open() {
    this.setState({ showModal: true });
  }
  
  _addNew(action) {
    if (action === 'dismiss') {
      this.setState({addnew: false});
      return;
    }
    let data = Array.from(this.state.data);
    data.unshift(this.refs.form.getData());
    this.setState({
      addnew: false,
      data: data,
    });
    this._commitToStorage(data);
  }

_download(format, ev) { //имя метода требует уточнения (щас используем _onNoteExport)
    var contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce(function(result, row) {
          return result
            + row.reduce(function(rowresult, cell, idx) {
                return rowresult 
                  + '"' 
                  + cell.replace(/"/g, '""')
                  + '"'
                  + (idx < row.length - 1 ? ',' : '');
              }, '')
            + "\n";
        }, '');

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {type: 'text/' + format});
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  }

  _downloadFrom(e) {
	// получаем из элемента события объект FileList, это массив
    var files = e.target.files, //массив элементов (файлов) из FileList
        file = files[0], // первый объект file из из массива files (из FileList'a)
        fileNameLocal = file.name, //узнаем имя файла в локальной системе
        typeFil = file.type, // узнаём информацию о типе файла
        fr,   //экземпляр типа FileReader
        dataTypeJson;  //для хранения распарсенной строки     
  // если  тип "JSON" то продолжаем    
  if (/application.json/.test(file.type)) { 
    fr = new FileReader(); //создаем экземпляр объекта FileReader
    // считываем его как текст (в кодировке UTF-8 по умолчанию)
    fr.readAsText(file);
    //создаем обработчик ошибки fr.onerror, если что-то пошло не так
    //не удалось прочитать файл
    fr.onerror =  () => { alert("не могу прочитать файл --  " + fr.error.code) }
      
    //BEGIN создаем "fr.onload", обработчик файла после загрузки.
    fr.onload =  (e) => {
      // как только файл загружен
      //в переменную пишем прочтенный файл, массив (в виде строки)
      var loadedFile = e.target.result;
      //парсим полученную строку, в массив объектов
      dataTypeJson = JSON.parse(loadedFile);
      //проверяем является ли dataTypeJson массивом
      if (!Array.isArray(dataTypeJson)) 
      { //Array.isArray(dataTypeJson)
      	alert("choose again file, что пошло не так, выберите файл еще раз ! ");
      }  
      //*****************alert("парсинг var dataTypeJson " + dataTypeJson);
      //здесь парсим полученный файл "JSON" на Дату и Схему
      //и устанавливаем setState()
      let schema = this._getSchemaNote(dataTypeJson);
      alert("это схема - " + schema);
      let data = this._getDataNote(dataTypeJson);
      let titlenote = schema[0].titlenote;
      this.setState({
    	schema: schema,
    	data: data,
    	titlenote: titlenote,   //обязательное поле (в будущем)
        });
      this._commitToStorage(data);
      //END процедуры "fr.onload"
     }  
    } else {	
       alert("choose another file, выберите другой тип файла, !");
       return;
    }
  }

  _onNoteExport(format, ev) {
  	let note = Array.from(this.state.data);
  	if (!Array.isArray(this.state.schema)) { //проверяем формат схемы
  		//если не массив, то отменяем Экспорт!
  		alert("не могу сделать ЭКСПОРТ. неверный формат Блокнота ===");
  		ev.preventDefault();
  		return;
  	} 
  	let nameFileExport = prompt("задайте имя Блокнота", "" + this.state.titlenote);
  	//проверить nameFileExport на null
  	if (nameFileExport != null) {
  		//выставляем новый заголовок Блокнота в Схеме
  		const schemaForExport = this.state.schema.map(item => {
  			item.titlenote = nameFileExport;
  			return item;
  		});
  		this.setState({
  			schema: schemaForExport,
  			titlenote: nameFileExport,
  		});
  	}
  	//// ???????????????????????? titlenote in schema
  	note.unshift(this.state.schema);
    var contents = JSON.stringify(note),
        URL = window.URL || window.webkitURL,
        blob = new Blob([contents], {type: 'text/' + format});
    ev.target.href = URL.createObjectURL(blob);
    //имя файла при сохранении ASdata.json
    ev.target.download = 'ASdata.' + format;   
  }

  _getSchemaNote(note) {
  	var shcm = note[0];
  	if (Array.isArray(shcm)) {
  		alert("это массив===");
  	} else {
  		alert("это чтото немассив ===");
  	};
  	return shcm;
  }

  _getDataNote(note) {
  	var data = note.slice(1);
  	return data;
  }

  _onExcelDataChange(data) {
  	alert("грузим!!")
    this.setState({data: data});
    this._commitToStorage(data);
  }
  
  _commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  
  _startSearching() {
    this._preSearchData = this.state.data;
  }
  
  _doneSearching() {
    this.setState({
      data: this._preSearchData,
    });
  }

  _search(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({data: this._preSearchData});
      return;
    }
    const fields = this.state.schema.map(item => item.id);
    const searchdata = this._preSearchData.filter(row => {
      for (let f = 0; f < fields.length; f++) {
        if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }
      return false;
    });
    this.setState({data: searchdata});
  }

  //Change the handleClick function:

  _handleClick(e) {     
    this.typeFileInput.click();
  }
  
  render() {

     const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wowSS.
      </Tooltip>
    );



    return (
      <div className="Whinepad" >
       
        <div  style={ 
      	 {border: "solid",
      	 borderColor: "#a21146",
      	 margin: "auto",
      	 textAlign: "center"}
      	 } >
         {this.state.titlenote} 
        </div>

        <div className="WhinepadToolbar"  >

            <ButtonToolbar className="clearfix">
            <Button 
              onClick={this._addNewDialog.bind(this)}
              className="WhinepadToolbarAddButton"
              bsStyle="success">

              + add
            </Button>
          

           
             <Button 
               onClick={this._onNoteExport.bind(this, 'json')}
               ref="WhinepadToolbarExportButton1" 
               href="data.json"
               bsStyle="primary"
                
               >
               to Export JSON
            </Button>
      
              <input 
              type="file"
              id="file"
              ref={(input) => { this.typeFileInput = input; }}
              accept="application/json"
              style={{display: "none"}} 
              onChange={this._downloadFrom.bind(this)}
              /> 

              <Button 
                onClick={this._handleClick.bind(this)}
                ref="WhinepadToolbarExportButton2"
                no_href="#"
                bsStyle="warning"
                >
                Import Note
              </Button>

               <Button 
                 //onClick={this._addNewDialogBs3.bind(this)}
                 // className="WhinepadToolbarAddButton"
                 bsStyle="success"
                 onClick={this._open.bind(this)}>

                 + add_BS3
               </Button>  

              <div className = "Divwrap">
                <FormControl type="text" placeholder="Search...BS3" />
              </div>

             </ButtonToolbar>
            
               
           

            <div className="WhinepadToolbarSearch">
             <input 
                placeholder="Search..." 
                onChange={this._search.bind(this)}
                onFocus={this._startSearching.bind(this)}
               onBlur={this._doneSearching.bind(this)}/>
            </div>

        </div>


        <div className="WhinepadDatagrid">
          <Excel 
            initialSchema={this.state.schema}
            initialData={this.state.data}
            onDataChange={this._onExcelDataChange.bind(this)} />
        </div>


        {  this.state.showModal 
    ? <Modal show={this.state.showModal} onHide={this._close.bind(this)} backdrop="static" >
          <Modal.Header closeButton>
                      <Modal.Title> Add new item. Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
              <p>there is a <OverlayTrigger overlay={popover}>
                   <a href="#">popover</a>
                        </OverlayTrigger> here</p>

              <h4>Tooltips in a modal</h4>
                   <p>there is a <OverlayTrigger overlay={tooltip}>
                         <a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <Form
             ref = "form"
             fields = { this.state.schema }
            /> 

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
           
          </Modal.Body>
          <Modal.Footer>
                     <Button onClick={this._close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal> 

    : null
}



        {this.state.addnew
          ? <Dialog 
              modal={true}
              header="Add new item"
              confirmLabel="Add"
              onAction={this._addNew.bind(this)}
            >
              <Form
                ref="form"
                fields={this.state.schema} />
            </Dialog>
          : null}
      </div>
    );
  }
}

Whinepad.propTypes = {
  initialSchema: PropTypes.arrayOf(
    PropTypes.object
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.object
  ),
};

export default Whinepad
