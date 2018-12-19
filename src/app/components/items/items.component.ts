import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import { ViewEncapsulation } from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public mostrar_backgroundAreas: boolean = false;
  public mostrar_htmlContents: boolean = false;
  public mostrar_visibleDynamicContent: boolean = false;

  public timeline_backgroundAreas: any;
  public timeline_htmlContents: any;
  public timeline_visibleDynamicContent: any;

  constructor() { }

  ngOnInit() {
  }

  backgroundAreas(): void {
    //variable true
    if (this.mostrar_backgroundAreas == true) {
      this.mostrar_backgroundAreas = false
      //Timeline vacio
      this.timeline_backgroundAreas = new vis.Timeline();

    } else if (this.mostrar_backgroundAreas == false) {
      if (this.timeline_backgroundAreas == undefined) {
        //lo muestra
        this.mostrar_backgroundAreas = true

        //Items del timeline
        var items = new vis.DataSet([
          //Periodos desde una fecha hasta otra
          { id: 'A', content: 'Periodo A', start: '2019-01-16', end: '2019-01-22', type: 'background' },
          { id: 'B', content: 'Periodo B', start: '2019-01-25', end: '2019-01-30', type: 'background', className: 'negative' },
          //Aqui comienzan los items
          { id: 1, content: 'Item 1<br>start', start: '2019-01-23' },
          { id: 2, content: 'Item 2', start: '2019-01-18' },
          { id: 3, content: 'Item 3', start: '2019-01-21' },
          { id: 4, content: 'Item 4', start: '2019-01-19', end: '2019-01-24' },
          { id: 5, content: 'Item 5', start: '2019-01-26' }
        ]);

        //En el container coge el elemento por ID
        var container = document.getElementById('backgroundAreas');
        var options = {
          start: '2019-01-10',
          end: '2019-02-10',
          editable: true
        };

        this.timeline_backgroundAreas = new vis.Timeline(container, items, options);


      } else {
        this.mostrar_backgroundAreas = true
      }
    }
  }

  htmlContents(): void {
    //variable true
    if (this.mostrar_htmlContents == true) {
      this.mostrar_htmlContents = false
      //Timeline vacio
      this.timeline_htmlContents = new vis.Timeline();

    } else if (this.mostrar_htmlContents == false) {
      if (this.timeline_htmlContents == undefined) {
        //lo muestra
        this.mostrar_htmlContents = true

        //Crear elementos HTML de varias maneras.
        var item1 = document.createElement('div');
        item1.appendChild(document.createTextNode('Item 1'));

        //Se crea un div con el span dentro
        var item2 = document.createElement('div');
        item2.innerHTML = '<span>Item 2</span>';

        //Se crea un div con un span, con class large y con texto Item 3
        var item3 = document.createElement('div');
        var span3 = document.createElement('span');
        span3.className = 'large';
        span3.appendChild(document.createTextNode('Item 3'));
        item3.appendChild(span3);

        //Se crea codigo html
        var item4 = 'Item <span class="large">4</span>';

        //Se crea div con las caracteristicas que ponemos
        var item5 = document.createElement('div');
        item5.appendChild(document.createTextNode('Item 5'));
        item5.appendChild(document.createElement('br'));
        var img5 = document.createElement('img');
        img5.src = 'http://visjs.org/examples/timeline/resources/img/attachment-icon.png';
        img5.style.width = '48px';
        img5.style.height = '48px';
        item5.appendChild(img5);

        var item6 = 'Item6<br><img src="http://visjs.org/examples/timeline/resources/img/comments-icon.png" style="width: 48px; height: 48px;">';

        var item7 = 'Item7<br><a href="http://visjs.org" target="_blank">Haga click aqui</a>';

        // create data and a Timeline
        var container = document.getElementById('htmlContents');
        var items = new vis.DataSet([
          { id: 1, content: item1, start: '2018-04-20' },
          { id: 2, content: item2, start: '2018-04-14' },
          { id: 3, content: item3, start: '2018-04-18' },
          { id: 4, content: item4, start: '2018-04-16', end: '2018-04-19' },
          { id: 5, content: item5, start: '2018-04-25' },
          { id: 6, content: item6, start: '2018-04-27' },
          { id: 7, content: item7, start: '2018-04-21' }
        ]);
        var options = {};
        this.timeline_htmlContents = new vis.Timeline(container, items, options);

      } else {
        this.mostrar_htmlContents = true
      }
    }
  }

  visibleDynamicContent(): void {
    //variable true
    if (this.mostrar_visibleDynamicContent == true) {
      this.mostrar_visibleDynamicContent = false
      //Timeline vacio
      this.timeline_visibleDynamicContent = new vis.Timeline();

    } else if (this.mostrar_visibleDynamicContent == false) {
      if (this.timeline_visibleDynamicContent == undefined) {
        //lo muestra
        this.mostrar_visibleDynamicContent = true

        //Cogemos el elemento con la id
        var container = document.getElementById('visibleDynamicContent');

        //Creacion de los items
        var items = new vis.DataSet([
          { id: 1, value: 0.2, content: 'Item 1', start: '2018-11-20', end: '2018-11-26' },
          { id: 2, value: 0.6, content: 'Item 2', start: '2018-12-14', end: '2018-12-18' },
          { id: 3, type: 'point', content: 'Item 3 (punto)', start: '2018-11-15', end: '2018-12-18' },
          {
            id: 4, content: 'Item 4 con visibleFrameTemplate', start: '2018-11-16', end: '2018-11-26', visibleFrameTemplate: '<div class="progress-wrapper"><div class="progress" style="width:80%"></div><label class="progress-label">80%<label></div>'
          }
        ]);

        //Configuracion para el timeline
        var options = {
          visibleFrameTemplate: function (item) {
            //Si existe visibleFrameTemplate lo devuelve
            if (item.visibleFrameTemplate) {
              return item.visibleFrameTemplate;
            }
            //Sino crea un porcentaje de % a partir del value del item
            var percentage = item.value * 100 + '%';
            return '<div class="progress-wrapper"><div class="progress" style="width:' + percentage + '"></div><label class="progress-label">' + percentage + '<label></div>';
          }
        };

        //Creacion del timeline
        this.timeline_visibleDynamicContent = new vis.Timeline(container, items, options);
      } else {
        this.mostrar_visibleDynamicContent = true
      }
    }

  }

}
