import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import { ViewEncapsulation } from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-data-handling',
  templateUrl: './data-handling.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./data-handling.component.css']
})
export class DataHandlingComponent implements OnInit {
  //Booleans para mostrar o ocultar
  public mostrar_dataSerialization: boolean = false;

  //Timeline para cada uno
  public timeline_dataSerialization: any;

  constructor() { }

  ngOnInit() {
  }

  dataSerialization(): void {

    var that = this
    //Funcion para cargar datos en el timeline
    function loadData() {
      //Devuelve HTMLElement que no contiene value
      //var txtData = document.getElementById('data');
      var txtData = (<HTMLInputElement>document.getElementById('data'))

      //Pasamos a JSON el valor del elemento textarea
      var data = JSON.parse(txtData.value);

      //Borramos lo que haya en items
      items.clear();
      //Añadimos los datos en json del text area
      items.add(data);

      //Ajusta la visualizacion a los nuevos datos
      that.timeline_dataSerialization.fit();
    }

    //Funcion para guardar los datos en el textarea
    function saveData() {
      var txtData = (<HTMLInputElement>document.getElementById('data'))

      //Se indica el tipo de datos
      var data = items.get({
        type: { start: 'ISODate', end: 'ISODate' }
      });

      // serialize the data and put it in the textarea
      txtData.value = JSON.stringify(data, null, 2);
    }

    //variable true
    if (this.mostrar_dataSerialization == true) {
      this.mostrar_dataSerialization = false
      //Timeline vacio
      this.timeline_dataSerialization = new vis.Timeline();

    } else if (this.mostrar_dataSerialization == false) {
      if (this.timeline_dataSerialization == undefined) {
        //lo muestra
        this.mostrar_dataSerialization = true

        //Codigo
        //Guardamos el elemento textarea
        var txtData = document.getElementById('data');
        //Guardamos los botones
        var btnLoad = document.getElementById('load');
        var btnSave = document.getElementById('save');

        //Creamos un nuevo DataSet vacio que usaremos en el timeline
        var items = new vis.DataSet();

        //Creamos el timeline
        var container = document.getElementById('dataSerialization');
        var options = {
          editable: true
        };
        this.timeline_dataSerialization = new vis.Timeline(container, items, options);

        //Cuando pulse al boton se ejecutara loadData
        btnLoad.onclick = loadData;

        //Cuando pulse al boton se ejecutara saveData
        btnSave.onclick = saveData;

        //Carga los datos iniciales
        loadData();


      } else {
        this.mostrar_dataSerialization = true
      }
    }
  }

}
