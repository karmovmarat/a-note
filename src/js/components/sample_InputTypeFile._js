
//функ­ция _downloadFileFromInput onFilesSelect получения файла с файловой системы из 
//элемента input type=file

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
    alert("тип файла правильный " + typeFil);
    
    fr = new FileReader(); //создаем экземпляр объекта FileReader
    // считываем его как текст (в кодировке UTF-8 по умолчанию)
    fr.readAsText(file);
    //создаем обработчик ошибки fr.onerror, если что-то пошло не так
    fr.onerror =  () => {
      //не удалось прочитать файл
      console.log("не могу прочитать файл " + fr.error.code);
    };
    //создаем fr.onload, обработчик файла после загрузки.
    fr.onload =  (e) => {
      // как только файл загружен
      //в переменную пишем прочтенный файл, массив (в виде строки)
      var loadedFile = e.target.result;
      alert("результат e.target.result " + loadedFile);
      //проверяем является ли loadedFile массивом
      if (true) {  //Array.isArray(loadedFile)
        //парсим полученную строку, в массив объектов
        dataTypeJson = JSON.parse(loadedFile);
        alert("парсJDBCS =  " + Array.isArray(dataTypeJson));
      } else {
        alert("choose again file, что пошло не так, выберите файл еще раз ! " + fileNameLocal +typeFil);
      }
      alert("парсинг var dataTypeJson " + dataTypeJson);
      this._onExcelDataChange(dataTypeJson);
     }
      
      /*или так, в переменную пишем прочтенный файл (в виде строки)
      var x = fr.result;
      console.log("x" + x);
      */
      //вызовем загрузку JSON из переменной dataTypeJson
      //_onExcelDataChange(dataTypeJson);
      /*/и отключим кнопку выбора файла
      $("div .col-md-3 input[type='file']").prop("disabled", true);
      console.log($("div .col-md-3 input[type='file']").prop("disabled"));
      // $("div .col-md-3").append($inputTypeFile);
      //$("div .col-md-3").append($inputTypeFile);
    //};
    */
  } else {  
    alert("choose another file, выберите другой тип файла, !");
    /*
    $("div .col-md-3 input[type='file']").prop("disabled", true);
    */
    return;
  }
}
/////////////////////


/////////////////////////////////////////////////////
//добавим форму


<div name="" id="" className=""> 
    <form name="" id="" >
        //добавляем элемент input type="file" на страницу
        <input type="file" name="" id="" accept="application/json" style="display:none"
        title="Выберите файл для загрузки">  </input>
        //добавим кнопку reset и ее лэйбл
        <label name="" id="" for="" >    "очистить файл  . "    </label>
        <input type="reset" name="" id="" value="CLEAR">         </input>      
    </form>
</div>


<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8">
  <title>Тег input, атрибут multiple</title>
 </head>
 <body>
    <div name="" id="" className=""> 
    <form name="" id="" >
        //добавляем элемент input type="file" на страницу
        <input type="file" name="" id="" accept="application/json" style="display:none" 
        title="Выберите файл для загрузки">  </input>
        //добавим кнопку reset и ее лэйбл
        <label name="" id="" for="" >    "очистить файл  . "    </label>
        <input type="reset" name="" id="" value="CLEAR">         </input>      
    </form>
</div>
 </body>
</html>

////////////////////////////////////////////
$("input[name='trty']").on("click", function(e) {
  console.log("вызов_1 ");
  addMyObject(addedObjectData_2);
});

$("div .col-md-3 input[name='local_F']").on("click", function(e) {
  console.log("очистка формы_local_F ");
  $("div .col-md-3 input[type='file']").prop("disabled", false);
});
// проверяем поддерживает ли браузер file API
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // если да, то как только страница загрузится
  onload = function() {
      // вешаем обработчик события, срабатывающий при изменении input'а
      $("div .col-md-3 input[type='file']").on("change", onFilesSelect);
      // document.querySelector('input').addEventListener('change', onFilesSelect, false);
      console.log("загрузка обработчика " + "onload");
    }
    // если нет, то предупреждаем, что демо работать не будет
} else {
  alert("К сожалению ваш браузер не поддерживает file API");
};
////////////////////////////////////////////////////