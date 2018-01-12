import Button from './Button';
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
    };
    this._preSearchData = null;
  }
  
  _addNewDialog() {
    this.setState({addnew: true});
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

_download(format, ev) {
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
      
    //создаем fr.onload, обработчик файла после загрузки.
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
      this._onExcelDataChange(dataTypeJson);
     }  
    } else {	
       alert("choose another file, выберите другой тип файла, !");
       return
    }
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
    const fields = this.props.schema.map(item => item.id);
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
    this.refs.fileUploader.click();
}
  
  render() {
    return (
      <div className="Whinepad">
        <div className="WhinepadToolbar">
          <div className="WhinepadToolbarAdd">
            <Button 
              onClick={this._addNewDialog.bind(this)}
              className="WhinepadToolbarAddButton">
              + add=7
            </Button>

            <div>A_500_
              <input 
              type="file"
              id="file"
              ref="fileUploader"
              accept="application/json"
              style={{display: "none"}} 
              onChange={this._downloadFrom.bind(this)}
              /> 



              <Button 
                onClick={this._handleClick.bind(this)}
                className="WhinepadToolbarAddButton">
                Загрузить input-file
              </Button>
            </div>

          </div>


          <div className="WhinepadToolbarExport">
            <Button 
               onClick={this._download.bind(this, 'json')}
               className="WhinepadToolbarExportButton" 
               href="data.json">
               to Export JSON
            </Button>
            <a 
               onClick={this._downloadFrom.bind(this)} >
               Download From
            </a>
          </div>
       
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
            schema={this.props.schema}
            initialData={this.state.data}
            onDataChange={this._onExcelDataChange.bind(this)} />
        </div>
        {this.state.addnew
          ? <Dialog 
              modal={true}
              header="Add new item"
              confirmLabel="Add"
              onAction={this._addNew.bind(this)}
            >
              <Form
                ref="form"
                fields={this.props.schema} />
            </Dialog>
          : null}
      </div>
    );
  }
}

Whinepad.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.object
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.object
  ),
};

export default Whinepad
