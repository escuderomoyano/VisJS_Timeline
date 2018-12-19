import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import {ViewEncapsulation} from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-basic-usage',
  templateUrl: './basic-usage.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./basic-usage.component.css']
})
export class BasicUsageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Elemento del DOM donde se mostrara la Timeline
    var container = document.getElementById('basic_usage');

    //Creamos los elementos (permitido enlace de datos de dos vias¿?)
    var items = new vis.DataSet([
      { id: 1, content: 'Primer dia', start: '2018-11-12' },
      { id: 2, content: 'Cambio horario', start: '2018-11-20' },
      { id: 3, content: 'Excursion', start: '2018-11-24' },
      { id: 4, content: 'Concierto', start: '2018-12-01', end: '2018-12-03' },
      { id: 5, content: 'Cumpleaños Lorena', start: '2018-12-12' },
      { id: 6, content: 'Cumpleaños Maria', start: '2018-12-17' },
      //Constructor de DataSet
      {
        start: new Date(2018, 12, 25),
        end: new Date(2018, 12, 31),  // end es Opcional
        content: 'Navidad'
        // Opcional: campos 'id', 'type', 'group', 'className', 'style'
      }
    ]);

    //Configuracion para el Timeline
    var options = {};
    
    //Creacion del Timeline
    var timeline = new vis.Timeline(container, items, options);
  }

}
