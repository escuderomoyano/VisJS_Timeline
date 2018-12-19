import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import {ViewEncapsulation} from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {

  //Booleans para mostrar o ocultar
  public mostrar_animate_window: boolean = false;
  public mostrar_click_to_use: boolean = false;
  public mostrar_event_listeners: boolean = false;
  public mostrar_limit_move_zoom: boolean = false;

  //Timeline para cada uno
  public timeline_animate_window: any;
  public timeline_click_to_use: any;
  public timeline_event_listeners: any;
  public timeline_limit_move_zoom: any;

  constructor() { }

  ngOnInit() {
  }

  //Funcion por cada ejemplo
  animate_window(): void {
    //variable true
    if (this.mostrar_animate_window == true) {
      this.mostrar_animate_window = false
      //Cuando lo oculte vuelve a ser undefined
      //this.timeline_animate_window = undefined
      this.timeline_animate_window = new vis.Timeline();
    } else if (this.mostrar_animate_window == false) {
      if (this.timeline_animate_window == undefined) {
        //Pone a true la que es y false las que no
        this.mostrar_animate_window = true

        var container = document.getElementById('animate_window');

        //Campos `start` y` end` se mostrarán como fechas ISO
        // obteniendo automáticamente datos del DataSet a través de items.get ().
        var items = new vis.DataSet({
          type: { start: 'ISODate', end: 'ISODate' }
        });

        //Agregar elementos al DataSet
        items.add([
          { id: 1, content: 'Primer dia<br>start', start: '2018-11-12' },
          { id: 2, content: 'Cambio horario', start: '2018-11-20' },
          { id: 3, content: 'Excursion Bunkers', start: '2018-11-24' },
          { id: 4, content: 'Concierto', start: '2018-12-01', end: '2018-12-03' },
          { id: 5, content: 'Cumpleaños Lorena', start: '2018-12-12', type: 'point' },
          { id: 6, content: 'Cumpleaños Maria', start: '2018-12-17' },
          { id: 7, content: 'Cumpleaños David', start: '2019-01-30' }
        ]);

        var options = {
          //Cuando comenzara por defecto el Timeline
          start: '2018-11-01',
          //Cuando acaba por defecto el Timeline
          end: '2019-01-30',
          //Se pueden manipular los items
          editable: true,
          //Bara vertical a fecha de hoy
          showCurrentTime: true
        };

        this.timeline_animate_window = new vis.Timeline(container, items, options);
      } else {
        this.mostrar_animate_window = true
      }
    }
  }

  /* FUNCIONES DE ANIMATE_WINDOW */
  first_secondData(): void {
    //La ventana muestra de la primera fecha a la segunda
    this.timeline_animate_window.setWindow(
      '2018-11-01',
      '2019-01-01'
    );
  }

  first_secondDataNoAmination(): void {
    this.timeline_animate_window.setWindow(
      '2018-11-01',
      '2019-01-01',
      //Añadimos que lo haga sin animacion
      { animation: false }
    );
  }

  goToChristmas(): void {
    //En el centro del Timeline estara navidad de 2018
    this.timeline_animate_window.moveTo('2018-12-25');
  }

  seeAll(): void {
    this.timeline_animate_window.fit();
  }

  selectAndFocus(): void {
    this.timeline_animate_window.setSelection([5, 6], {
      //Para poner la ventana centrada en ellos
      focus: true
    });
  }

  focus(): void {
    //Ara focus al item con el id 2
    this.timeline_animate_window.focus(2);
  }

  focusAnimation(): void {
    this.timeline_animate_window.focus(
      //Enfocar
      [5, 6],
      //Animacion
      {
        animation:
          //Configuracion de la animacion miliseg 
          { duration: 3000, easingFunction: 'linear' }
      }
    );
  }

  focusSelect(): void {
    //Se guarda el id del seleccionado
    var selection = this.timeline_animate_window.getSelection();
    //Se pasa al timeline
    this.timeline_animate_window.focus(selection);
  }
  /* FIN DE FUNCIONES DE ANIMATE_WINDOW */

  click_to_use(): void {
    //variable true
    if (this.mostrar_click_to_use == true) {
      this.mostrar_click_to_use = false
      //Cuando lo oculte vuelve a ser undefined
      //this.timeline_click_to_use = undefined
      this.timeline_click_to_use = new vis.Timeline();
    } else if (this.mostrar_click_to_use == false) {
      if (this.timeline_click_to_use == undefined) {
        //Pone a true la que es y false las que no
        this.mostrar_click_to_use = true

        //Codigo
        var container = document.getElementById('click_to_use');

        var items = new vis.DataSet({
          type: { start: 'ISODate', end: 'ISODate' }
        });

        //agregar elementos al DataSet
        items.add([
          { id: 1, content: 'Primer dia<br>start', start: '2018-11-12' },
          { id: 2, content: 'Cambio horario', start: '2018-11-20' },
          { id: 3, content: 'Excursion', start: '2018-11-24' },
          { id: 4, content: 'Concierto', start: '2018-12-01', end: '2018-12-03' },
          { id: 5, content: 'Cumpleaños Lore', start: '2018-12-12', type: 'point' },
          { id: 6, content: 'Cumpleaños Mari', start: '2018-12-17' }
        ]);

        var options = {
          //Se pueden manipular los items
          editable: true,
          //Reacciona al raton y podra reaccionar a eventos
          clickToUse: true
        };

        this.timeline_click_to_use = new vis.Timeline(container, items, options);

      } else {
        this.mostrar_click_to_use = true
      }
    }
  }


  //event_listeners
  event_listeners(): void {

    //Funcion que pasa a string un objeto, en este caso las propiedades
    function stringifyObject(object: any): string {
      if (!object) return;
      var replacer = function (key: any, value: any) {
        if (value && value.tagName) {
          return "DOM Element";
        } else {
          return value;
        }
      }
      return JSON.stringify(object, replacer)
    }

    //Funcion que hace los logs y los pone dentro del div con id log
    function logEvent(event: any, properties: any): void {
      //Se guarda el elemento con id log en log
      var log = document.getElementById('log');
      //Se crea un elemento div y se guarda en msg
      var msg = document.createElement('div');
      //Se añade el siguiente html en el elemento div de la variable msg
      msg.innerHTML = 'Evento= ' + JSON.stringify(event) + ' / ' + 'Propiedades= ' + stringifyObject(properties);
      //Si en el elemento log tiene un "hijo" se inserta despues sino se inseta un "hijo" con la informacion del evento
      log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
    }

    //variable true
    if (this.mostrar_event_listeners == true) {
      this.mostrar_event_listeners = false
      //Cuando lo oculte vuelve a ser undefined
      this.timeline_event_listeners = new vis.Timeline();
    } else if (this.mostrar_event_listeners == false) {
      if (this.timeline_event_listeners == undefined) {
        //lo muestra
        this.mostrar_event_listeners = true

        //Codigo
        var container = document.getElementById('event_listeners');

        var items = new vis.DataSet([
          { id: 1, content: 'Primer dia<br>start', start: '2018-11-12' },
          { id: 2, content: 'Cambio horario', start: '2018-11-20' },
          { id: 3, content: 'Excursion Bunkers', start: '2018-11-24' },
          { id: 4, content: 'Concierto', start: '2018-12-01', end: '2018-12-03' },
          { id: 5, content: 'Cumpleaños Lorena', start: '2018-12-12' },
          { id: 6, content: 'Cumpleaños Maria', start: '2018-12-17' }
        ]);

        var options = {
          editable: true,
          onInitialDrawComplete: function () {
            logEvent('Timeline inicial mostrado', {});
          },
        };
        this.timeline_event_listeners = new vis.Timeline(container, items, options);

        //Le pasamos el evento de los disponibles y la funcion
        this.timeline_event_listeners.on('select', function (properties) {
          logEvent('select', properties);
        });

        this.timeline_event_listeners.on('itemover', function (properties) {
          logEvent('itemover', properties);
          stringifyObject(properties.item);
        });

        this.timeline_event_listeners.on('itemout', function (properties) {
          logEvent('itemout', properties);
          stringifyObject('none');
        });

        this.timeline_event_listeners.on('click', function (properties) {
          logEvent('click', properties);
        });

        this.timeline_event_listeners.on('doubleClick', function (properties) {
          logEvent('doubleClick', properties);
        });

        this.timeline_event_listeners.on('mouseDown', function (properties) {
          logEvent('mouseDown', properties);
        });

        this.timeline_event_listeners.on('mouseUp', function (properties) {
          logEvent('mouseUp', properties);
        });

        items.on('*', function (event, properties) {
          logEvent(event, properties);
        });
        //

      } else {
        this.mostrar_event_listeners = true
      }
    }
  }

  limit_move_zoom(): void {
    //variable true
    if (this.mostrar_limit_move_zoom == true) {
      this.mostrar_limit_move_zoom = false
      //Timeline vacio
      this.timeline_limit_move_zoom = new vis.Timeline();

    } else if (this.mostrar_limit_move_zoom == false) {
      if (this.timeline_limit_move_zoom == undefined) {
        //lo muestra
        this.mostrar_limit_move_zoom = true

        //Se crean los items
        var items = new vis.DataSet([
          { 'start': new Date(2018, 4, 25), 'content': 'Dia 25' },
          { 'start': new Date(2018, 4, 26), 'content': 'Dia 26' }
        ]);

        //Seleccionar elemento
        var container = document.getElementById('limit_move_zoom');
        //Configurar opciones
        var options = {
          //Alto
          height: '150px',
          min: new Date(2018, 0, 1),                //Limite minimo que se podra ver en el rango, menor de 2018 no aparecera
          max: new Date(2019, 0, 1),                //Limite maximo que se podra ver en el rango, mayor de 2018 no aparecera
          zoomMin: 1000 * 60 * 60 * 24,             //El zoom minimo sera de un dia (En milisegundos)
          zoomMax: 1000 * 60 * 60 * 24 * 31 * 3     //El zoom maximo sera de tres meses (En milisegundos)
        };

        //Crea el timeline
        this.timeline_limit_move_zoom = new vis.Timeline(container);
        this.timeline_limit_move_zoom.setOptions(options);
        this.timeline_limit_move_zoom.setItems(items);


      } else {
        this.mostrar_limit_move_zoom = true
      }
    }
  }

  //Modelo
  functionEmpty(): void {
    //variable true
    if (this.mostrar_click_to_use == true) {
      this.mostrar_click_to_use = false
      //Timeline vacio
      this.timeline_click_to_use = new vis.Timeline();

    } else if (this.mostrar_click_to_use == false) {
      if (this.timeline_animate_window == undefined) {
        //lo muestra
        this.mostrar_click_to_use = true

        //Codigo


      } else {
        this.mostrar_click_to_use = true
      }
    }
  }

}
