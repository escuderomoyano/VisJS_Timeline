import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import {ViewEncapsulation} from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {
  public mostrar_editingItems: boolean = false;
  public mostrar_individualEditableItems: boolean = false;
  public mostrar_overrideEditingItems: boolean = false;
  public mostrar_updateDataOnEvent: boolean = false;

  public timeline_editingItems: any;
  public timeline_individualEditableItems: any;
  public timeline_overrideEditingItems: any;
  public timeline_mostrar_updateDataOnEvent: any;

  constructor() { }

  ngOnInit() {
  }

  editingItems(): void {

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
    if (this.mostrar_editingItems == true) {
      this.mostrar_editingItems = false
      //Timeline vacio
      this.timeline_editingItems = new vis.Timeline();
      //this.timeline_editingItems.destroy();

    } else if (this.mostrar_editingItems == false) {
      if (this.timeline_editingItems == undefined) {
        //lo muestra
        this.mostrar_editingItems = true

        //Codigo
        //Crear DataSet con items
        //Campos start y end seran de tipo string, contendra fecha ISO
        //Se podria obtener los datos a traves de items.get()
        var items = new vis.DataSet({
          type: { start: 'ISODate', end: 'ISODate' }
        });

        //Añadir items al DataSet
        items.add([
          { id: 1, content: 'Dia 23<br>inicio', start: '2018-12-23' },
          { id: 2, content: 'Dia 18', start: '2018-12-18' },
          { id: 3, content: 'Dia 21', start: '2018-12-21' },
          { id: 4, content: 'Dia 19 hasta 24', start: '2018-12-19', end: '2018-12-24' },
          { id: 5, content: 'Dia 28', start: '2018-12-28', type: 'point' },
          { id: 6, content: 'Dia 26', start: '2018-12-26' }
        ]);

        //Log de los cambios en la consola
        items.on('*', function (event: any, properties: any) {
          //Nombre del evento y las propiedades, que saldra el id
          console.log(event, properties.items);
          //
          logEvent(event, properties)
        });

        //Elemento que contendra el timeline
        var container = document.getElementById('editingItems');

        //Configuracion de las opciones del timeline
        var options = {
          start: '2018-12-10',
          end: '2019-01-10',
          height: '160px',
          //Permite selecion multiple de items usando ctrl+click, shift+click o mantener
          multiselect: true,
          //Permite edicion de los items
          editable: true,
          showCurrentTime: true
        };

        this.timeline_editingItems = new vis.Timeline(container, items, options);


      } else {
        this.mostrar_editingItems = true
      }
    }
  }

  individualEditableItems(): void {
    //variable true
    if (this.mostrar_individualEditableItems == true) {
      this.mostrar_individualEditableItems = false
      //Timeline vacio
      this.timeline_individualEditableItems = new vis.Timeline();

    } else if (this.mostrar_individualEditableItems == false) {
      if (this.timeline_individualEditableItems == undefined) {
        //lo muestra
        this.mostrar_individualEditableItems = true

        //Creacion de grupos
        var groups = new vis.DataSet([
          { id: 1, content: 'Grupo 1' },
          { id: 2, content: 'Grupo 2' }
        ]);

        var items = new vis.DataSet([
          //editable true todo se puede editar (tiempo, grupo y eliminar)
          //group indicarle el id del grupo
          { id: 1, content: 'Editable', editable: true, start: '2018-08-23', group: 1 },
          { id: 2, content: 'Editable', editable: true, start: '2018-08-23T23:00:00', group: 2 },
          //editable false no se puede editar nada (tiempo, grupo o eliminar)
          { id: 3, content: 'Solo lectura', editable: false, start: '2018-08-24T16:00:00', group: 1 },
          { id: 4, content: 'Solo lectura', editable: false, start: '2018-08-26', end: '2018-09-02', group: 2 },
          { id: 5, content: 'Edit Tiempo Solo', editable: { updateTime: true, updateGroup: false, remove: false }, start: '2018-08-28', group: 1 },
          { id: 6, content: 'Edit Grupo Solo', editable: { updateTime: false, updateGroup: true, remove: false }, start: '2018-08-29', group: 2 },
          { id: 7, content: 'Quitar Solo', editable: { updateTime: false, updateGroup: false, remove: true }, start: '2018-08-31', end: '2018-09-03', group: 1 },
          { id: 8, content: 'Defecto', start: '2018-09-04T12:00:00', group: 2 }
        ]);

        var container = document.getElementById('individualEditableItems');
        var options = {
          editable: true, //defecto para todos los items
          height: '160px'
        };

        this.timeline_individualEditableItems = new vis.Timeline(container, items, groups, options);

      } else {
        this.mostrar_individualEditableItems = true
      }
    }
  }

  overrideEditingItems(): void {
    //variable true
    if (this.mostrar_overrideEditingItems == true) {
      this.mostrar_overrideEditingItems = false
      //Timeline vacio
      this.timeline_overrideEditingItems = new vis.Timeline();

    } else if (this.mostrar_overrideEditingItems == false) {
      if (this.timeline_overrideEditingItems == undefined) {
        //lo muestra
        this.mostrar_overrideEditingItems = true

        //Codigo
        //Creacion del DataSet con los items
        var items = new vis.DataSet([
          { id: 1, content: 'Por Defecto', start: '2018-08-23', group: 1 },
          { id: 2, content: 'Por Defecto', start: '2018-08-23T23:00:00', group: 2 },
          { id: 3, content: 'Solo lectura', editable: false, start: '2018-08-27', end: '2018-08-30', group: 2 },
          { id: 4, content: 'Editable', editable: true, start: '2018-08-28', group: 1 },
          { id: 5, content: 'Por Defecto', start: '2018-08-29', group: 2 },
          { id: 6, content: 'Editable', editable: true, start: '2018-08-31', end: '2018-09-03', group: 1 },
          { id: 7, content: 'Solo lectura', editable: false, start: '2018-09-04T12:00:00', group: 2 },
          { id: 8, content: 'Por Defecto', start: '2018-09-04', group: 1 },
          { id: 9, content: 'Por Defecto', start: '2018-08-24', group: 2 }
        ]);

        //Creacion de los grupos
        var groups = [
          { id: 1, content: 'Grupo 1' },
          { id: 2, content: 'Grupo 2' }
        ]

        //Selecion del elemento por id
        var container = document.getElementById('overrideEditingItems');
        //Opciones del timeliner por defecto
        var options = {
          height: '160px',
          editable: {
            add: true,
            remove: true,
            updateGroup: false,
            updateTime: true,
            overrideItems: false
          }
        };

        //Creacion del timeliner
        this.timeline_overrideEditingItems = new vis.Timeline(container, items, groups, options);

        var that = this;
        //Actualizacion de las opciones
        var updateEditOptions = function (e) {
          //Cogemos el nombre que sera add, remove, updateGroup...
          var changedOption = e.target.name;
          var options = { editable: {} };
          //Entramos en options.editable y cambiamos el valor del nombre por el true o false del checked
          options.editable[changedOption] = e.target.checked;
          console.log(options)
          that.timeline_overrideEditingItems.setOptions(options);
        };

        //Selecion de todos los elementos con tag input
        var cbs = document.getElementsByTagName("input");
        //Recorremos todos los elementos
        [].forEach.call(cbs, function (cb) {
          //Cada onchange que se haga haremos updateEditOptions
          cb.onchange = updateEditOptions;
        });


      } else {
        this.mostrar_overrideEditingItems = true
      }
    }
  }

  updateDataOnEvent(): void {
    //variable true
    if (this.mostrar_updateDataOnEvent == true) {
      this.mostrar_updateDataOnEvent = false
      //Timeline vacio
      this.timeline_mostrar_updateDataOnEvent = new vis.Timeline();

    } else if (this.mostrar_updateDataOnEvent == false) {
      if (this.timeline_mostrar_updateDataOnEvent == undefined) {
        //lo muestra
        this.mostrar_updateDataOnEvent = true

        //Codigo
        console.log(new Date((new Date()).getTime() - 60 * 1000))
        //Crear los items
        var data = new vis.DataSet([
          {
            id: 1,
            //Empieza un minuto despues del tiempo actual
            start: new Date((new Date()).getTime() - 60 * 1000),
            //Finaliza en el mismo momento
            end: new Date(),
            content: 'Evento dinamico'
          }
        ]);

        //Opciones de configuracion del timeline
        var options = {
          height: '160px',
          showCurrentTime: true
        };

        //Creacion del timeline
        var container = document.getElementById('updateDataOnEvent');
        this.timeline_mostrar_updateDataOnEvent = new vis.Timeline(container, data, options);

        //Añade una barra en el momento actual
        this.timeline_mostrar_updateDataOnEvent.addCustomTime(new Date());

        //Añadido el evento que escucha
        this.timeline_mostrar_updateDataOnEvent.on('timechange', function (event: any) {
          document.getElementById("customTime").innerHTML = "Tiempo personalizado: " + event.time;

          console.log(event.time)
          var item = data.get(1);
          //Si el tiempo del evento es mayor a cuando empezo
          if (event.time > item.start) {
            item.end = new Date(event.time);
            var now = new Date();
            //Si el evento se acaba antes que la fecha actual, es un evento pasado
            if (event.time < now) {
              item.content = "Evento dinamico (pasado)";
              item.className = 'past';
            }
            //Si el evento se acaba despues que la fecha actual, es un evento futuro
            else if (event.time > now) {
              item.content = "Evento dinamico (futuro)";
              item.className = 'future';
            }
            //Si el evento se acaba justo en el mismo que la fecha actual, es un evento actual
            else {
              item.content = "Evento dinamico (actual)";
              item.className = 'now';
            }

            //Actualiza el item con el content y la className
            data.update(item);
          }
        });

        // set a custom range from -2 minute to +3 minutes current time
        var start = new Date((new Date()).getTime() - 2 * 60 * 1000);
        var end = new Date((new Date()).getTime() + 3 * 60 * 1000);
        this.timeline_mostrar_updateDataOnEvent.setWindow(start, end, { animation: false });

      } else {
        this.mostrar_updateDataOnEvent = true
      }
    }
  }

}
