import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import { ViewEncapsulation } from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit {
  //Booleans para mostrar o ocultar
  public mostrar_axisOrientation: boolean = false;
  public mostrar_customCss: boolean = false;
  public mostrar_itemClassNames: boolean = false;

  //Timeline para cada uno
  public timeline_axisOrientation: any;
  public timeline_customCss: any;
  public timeline_itemClassNames: any;

  constructor() { }

  ngOnInit() {
  }

  axisOrientation(): void {

    //
    var that = this
    //Funcion al hacer un cambio en el select
    function axisChange(): void {
      //Variable donde se encuentra el value
      var inputValue = (<HTMLInputElement>document.getElementById('axis-orientation')).value;
      //Modificacion de las opciones del timeline
      that.timeline_axisOrientation.setOptions({
        orientation: { axis: inputValue }
      });
    };

    var that = this
    //Funcion al hacer un cambio en el select
    function itemChange(): void {
      //Variable donde se encuentra el value
      var inputValue = (<HTMLInputElement>document.getElementById('item-orientation')).value;
      //Modificacion de las opciones del timeline
      that.timeline_axisOrientation.setOptions({
        orientation: { item: inputValue }
      });
    };
    //

    //variable true
    if (this.mostrar_axisOrientation == true) {
      this.mostrar_axisOrientation = false
      //Timeline vacio
      this.timeline_axisOrientation = new vis.Timeline();

    } else if (this.mostrar_axisOrientation == false) {
      if (this.timeline_axisOrientation == undefined) {
        //lo muestra
        this.mostrar_axisOrientation = true

        //Codigo
        //Elemento del DOM donde estara el timeline
        var container = document.getElementById('axisOrientation');

        //Creacion del DataSet
        var items = new vis.DataSet([
          { id: 1, content: 'Cumpleaños S', start: '2018-12-12' },
          { id: 2, content: 'Cumpleaños K', start: '2018-12-12' },
          { id: 3, content: 'Cumpleaños S', start: '2018-12-17' },
          { id: 4, content: 'Puente Constitución', start: '2018-12-6', end: '2018-12-9' },
          { id: 5, content: 'Navidad', start: '2018-12-25' },
          { id: 6, content: 'Sant Esteve', start: '2018-12-26', type: 'point' }
        ]);

        //Opciones de configuracion del timeline
        var options = {
          height: 250 // px
        };

        //Creacion del timeline
        this.timeline_axisOrientation = new vis.Timeline(container, items, options);

        //Elemento input para la orientacion del eje
        var axisOrientation = document.getElementById('axis-orientation');

        //Ejecutar en caso de que el elemento input cambie
        axisOrientation.onchange = axisChange;

        //Elemento input para la orientacion de los items
        var itemOrientation = document.getElementById('item-orientation');

        //Ejecutar en caso de que el elemento input cambie
        itemOrientation.onchange = itemChange;


      } else {
        this.mostrar_axisOrientation = true
      }
    }
  }

  customCss(): void {
    //variable true
    if (this.mostrar_customCss == true) {
      this.mostrar_customCss = false
      //Timeline vacio
      this.timeline_customCss = new vis.Timeline();

    } else if (this.mostrar_customCss == false) {
      if (this.timeline_customCss == undefined) {
        //lo muestra
        this.mostrar_customCss = true

        //Codigo
        var container = document.getElementById('customCss');

        //Añadimos los items, en content se puede poner una template
        var items = new vis.DataSet([
          { start: new Date(2018, 11, 23), content: '<div>Conversacion</div><img src="http://visjs.org/examples/timeline/resources/img/community-users-icon.png" style="width:32px; height:32px;">' },
          //(aa, mes, dia, hh, mm, ss, ms)
          { start: new Date(2018, 11, 23, 23, 0, 0), content: '<div>Correo del jefe</div><img src="http://visjs.org/examples/timeline/resources/img/mail-icon.png" style="width:32px; height:32px;">' },
          { start: new Date(2018, 11, 24, 16, 0, 0), content: 'Report' },
          { start: new Date(2018, 11, 26), end: new Date(2018, 12, 2), content: 'Trayecto A' },
          { start: new Date(2018, 11, 28), content: '<div>Memo</div><img src="http://visjs.org/examples/timeline/resources/img/notes-edit-icon.png" style="width:48px; height:48px;">' },
          { start: new Date(2018, 11, 29), content: '<div>Llamada telefónica</div><img src="http://visjs.org/examples/timeline/resources/img/Hardware-Mobile-Phone-icon.png" style="width:32px; height:32px;">' },
          { start: new Date(2018, 11, 31), end: new Date(2018, 12, 3), content: 'Trayecto B' },
          { start: new Date(2018, 12, 4, 12, 0, 0), content: '<div>Report</div><img src="http://visjs.org/examples/timeline/resources/img/attachment-icon.png" style="width:32px; height:32px;">' }
        ]);

        //Configuracion de las opciones
        var options = {
          editable: true,
          margin: {
            item: 20,
            axis: 40
          }
        };

        //Se crea el timeline
        this.timeline_customCss = new vis.Timeline(container, items, options);


      } else {
        this.mostrar_customCss = true
      }
    }
  }

  itemClassNames(): void {
    //variable true
    if (this.mostrar_itemClassNames == true) {
      this.mostrar_itemClassNames = false
      //Timeline vacio
      this.timeline_itemClassNames = new vis.Timeline();

    } else if (this.mostrar_itemClassNames == false) {
      if (this.timeline_itemClassNames == undefined) {
        //lo muestra
        this.mostrar_itemClassNames = true

        //Codigo
        //Creacion de los datos
        var data = new vis.DataSet([
          {
            'start': new Date(2018, 11, 19),
            'content': 'default'
          },
          {
            'start': new Date(2018, 11, 23),
            'content': 'green',
            'className': 'green'
          },
          {
            'start': new Date(2018, 11, 29),
            'content': 'red',
            'className': 'red'
          },
          //Por la className se podra acceder al css usando
          //.vis-item.vis-selected.orange
          //cuando este selecionado
          {
            'start': new Date(2018, 11, 27),
            'end': new Date(2019, 0, 1),
            'content': 'orange',
            'className': 'orange'
          },
          //Por la className podras acceder al estilo usando
          //.vis-item.magenta
          {
            'start': new Date(2018, 11, 10),
            'content': 'magenta',
            'className': 'magenta'
          }
        ]);

        //Configuracion de opciones del timeline
        var options = {
          editable: true
        };

        //Selecionando el item que contendra el timeline
        var container = document.getElementById('itemClassNames');
        //Creacion del timeline
        this.timeline_itemClassNames = new vis.Timeline(container, data, options);

      } else {
        this.mostrar_itemClassNames = true
      }
    }
  }

}
