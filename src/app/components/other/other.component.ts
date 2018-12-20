import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import { ViewEncapsulation } from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  //Booleans para mostrar o ocultar
  public mostrar_dragdrop: boolean = false;
  public mostrar_localization: boolean = false;
  public mostrar_timezone: boolean = false;

  //Timeline para cada uno
  public timeline_dragdrop: any;
  public timeline_localization: any;
  public timeline_timezoneLocal: any;
  public timeline_timezoneUTC: any;
  public timeline_timezonePlus8: any;

  constructor() { }

  ngOnInit() {
  }
  dragdrop(): void {

    //Funcion al arrastrar de la lista items hacia el timeline
    function handleDragStart(event) {
      //Guarda el contenido del evento, que sera el texto del interior del li
      var contentItem = event.target.innerHTML;

      //Efecto al hacer el evento en este caso efecto de mover
      event.dataTransfer.effectAllowed = 'move';

      //Se separa por "-", el 1 contendra el type del item
      var itemType = contentItem.split('-')[1].trim();

      //Creamos el item, any para assignarle luego otos campos
      var item: any = {
        id: new Date(),
        //El tipo sera el que este en el HTML
        type: itemType,
        //El contenido sera la posicion 0 del split por "-"
        content: contentItem.split('-')[0].trim()
      };

      //Mira la posicion 2 para ver si contiene el texto fixed times
      var isFixedTimes = (contentItem.split('-')[2] && contentItem.split('-')[2].trim() == 'fixed times')

      //Si existe el fixed times
      if (isFixedTimes) {
        //Iniciamos el Item en el momento
        item.start = new Date();
        //Finalizacion en 10 minutos tal como dice en el HTML
        item.end = new Date(1000 * 60 * 10 + (new Date()).valueOf());
      }

      //El valor del item se pasa en JSON
      event.dataTransfer.setData("text", JSON.stringify(item));
    }

    //Funcion al mover el objeto
    function handleObjectItemDragStart(event) {
      //Efecto al hacer el evento en este caso efecto de mover
      event.dataTransfer.effectAllowed = 'move';

      //Se crea un objeto
      var objectItem = {
        //¿?
        content: 'objectItemData',
        //Contenido de cada item
        target: 'item'
      };

      //El valor del objectItem se pasa en JSON
      event.dataTransfer.setData("text", JSON.stringify(objectItem));
    }

    //variable true
    if (this.mostrar_dragdrop == true) {
      this.mostrar_dragdrop = false
      //Timeline vacio
      this.timeline_dragdrop = new vis.Timeline();

    } else if (this.mostrar_dragdrop == false) {
      if (this.timeline_dragdrop == undefined) {
        //lo muestra
        this.mostrar_dragdrop = true

        //Codigo
        //Creamos tres grupos para el timeliner
        var numberOfGroups = 3;

        //Creamos los grupos
        var groups = new vis.DataSet()

        //Recorremos de 0 al numbero de grupos
        for (var i = 0; i < numberOfGroups; i++) {
          //Añadimos el id y el contenido que tendran los grupos
          groups.add({
            id: i,
            content: 'Grupo&nbsp;' + i
          })
        }

        //Crearemos items
        var numberOfItems = 10;
        //Crearemos los items
        var items = new vis.DataSet();

        //Calculando los ites entre los grupos que hay
        var itemsPerGroup = Math.round(numberOfItems / numberOfGroups);

        //Recorremos los grupos
        for (var group = 0; group < numberOfGroups; group++) {
          //Fecha de hoy para partir de este punto
          var date = new Date();
          //Recorremos los items por grupo
          for (var order = 0; order < itemsPerGroup; order++) {
            //Problemas al comparar numeros con un boolean
            //date.setHours(date.getHours() + 4 * (Math.random() < 0.2));

            //Numero random
            var random = Math.random()
            //Si es menor que 0.2
            if (random < 0.2) {
              date.setHours(date.getHours() + 4 * 0.2);
              //Si es mayor a 0.2
            } else if (random > 0.2) {
              date.setHours(date.getHours() + 4);
            } else {
              console.log(random)
            }

            //Se crea una fecha para poner de inicio
            //date.setHours(date.getHours() + 4);
            var start = new Date(date);

            //Se crea una fecha para poner de fin
            date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
            var end = new Date(date);

            //Agregar cada item
            items.add({
              id: order + itemsPerGroup * group,
              group: group,
              start: start,
              end: end,
              content: 'Orden ' + order
            });

          }
        }

        //Especificar opciones
        var options = {
          width: '100%',
          //height: '140px',
          //Para que si hay items del timelist se pongan uno encima de otro
          stack: true,
          //Inicio de timeline a la fecha actual
          start: new Date(),
          //Fin pasado un dia de la fecha de inicio
          end: new Date(1000 * 60 * 60 * 24 + (new Date()).valueOf()),
          editable: true,
          orientation: 'top',
          //Funcion que contiene el objectData y item
          onDropObjectOnItem: function (objectData, item, callback) {
            if (!item) {
              return;
            } if (!item.data.end) {
              alert('Seleccionado item: "' + item.content + ' " . Inicio: ' + item.data.start.toLocaleString());
            } else if (item.data.end) {
              alert('Seleccionado item: "' + item.content + ' " . Inicio: ' + item.data.start.toLocaleString() + '. Fin: ' + item.data.end.toLocaleString());
            }
          }
        };

        //Elemento del DOM
        var container = document.getElementById('dragdrop');
        //Creacion del timeline
        this.timeline_dragdrop = new vis.Timeline(container, items, groups, options);

        //Guarda cada item de la lista de items que hay en el html
        var itemsList = document.querySelectorAll('.items .item');

        //Guarda los objetos que hay en el html
        var objectItems = document.querySelectorAll('.object-item');

        //Recorremos los items
        for (var i = itemsList.length - 1; i >= 0; i--) {
          //Cada item de items hara la accion
          var item = itemsList[i];
          //Escucha los eventos de cada uno de los items, ejecuta el handleDragStart cuando lo escucha
          item.addEventListener('dragstart', handleDragStart.bind(this), false);
        }

        for (var i = objectItems.length - 1; i >= 0; i--) {
          //Cada objeto
          var objectItem = objectItems[i];
          //Escucha los eventos de cada objeto (en este caso solo hay uno), ejecuta handleObjectItemDragStart cuando lo escucha
          objectItem.addEventListener('dragstart', handleObjectItemDragStart.bind(this), false);
        }

      } else {
        this.mostrar_dragdrop = true
      }
    }
  }

  localization(): void {
    var that = this;
    function test(): void {
      var inputValue = (<HTMLInputElement>document.getElementById('locale')).value;
      that.timeline_localization.setOptions({
        locale: inputValue
      });
    }

    //variable true
    if (this.mostrar_localization == true) {
      this.mostrar_localization = false
      //Timeline vacio
      this.timeline_localization = new vis.Timeline();

    } else if (this.mostrar_localization == false) {
      if (this.timeline_localization == undefined) {
        //lo muestra
        this.mostrar_localization = true

        //Codigo
        var DAY = 24 * 60 * 60 * 1000;

        //Elemento DOM donde se adjuntará la timeline
        var container = document.getElementById('localization');

        //Creacion de DataSet
        var items = new vis.DataSet([
          { id: 1, content: 'Dia anterior', start: new Date(new Date().valueOf() - DAY) },
          { id: 2, content: 'Dos dias despues', start: new Date(new Date().valueOf() + 2 * DAY) }
        ]);

        //Configuracion para el Timeline
        var options = {
          showCurrentTime: true,
          locale: 'en'
        };

        //Creacion del Timeline
        this.timeline_localization = new vis.Timeline(container, items, options);

        this.timeline_localization.addCustomTime(new Date());

        //Se añade una linea en el dia de mañana
        this.timeline_localization.setCustomTime(new Date(new Date().valueOf() + DAY));

        //Actualizar cuando carga el valor del select
        var select = document.getElementById('locale');

        //Cada vez que cambia el select
        select.onchange = test;

      } else {
        this.mostrar_localization = true
      }
    }
  }

  timezone(): void {
    //variable true
    if (this.mostrar_timezone == true) {
      this.mostrar_timezone = false
      //Timeline vacio
      //this.timeline_timezone = new vis.Timeline();
      this.timeline_timezoneLocal = new vis.Timeline();
      this.timeline_timezoneUTC = new vis.Timeline();
      this.timeline_timezonePlus8 = new vis.Timeline();

    } else if (this.mostrar_timezone == false) {
      if (this.timeline_timezoneLocal == undefined && this.timeline_timezoneUTC == undefined && this.timeline_timezonePlus8 == undefined) {
        //lo muestra
        this.mostrar_timezone = true

        //Codigo
        var today = vis.moment(vis.moment.utc().format('YYYY-MM-DDT00:00:00.000Z'));
        var start = today.clone();
        var end = today.clone().add(2, 'day');
        var customTime = today.clone().add(28, 'hour');

        //Creacion de DataSet
        var items = new vis.DataSet([
          { id: 1, content: 'Item 1', start: today.clone().add(8, 'hour') },
          { id: 2, content: 'Item 2', start: today.clone().add(16, 'hour') },
          { id: 3, content: 'Item 3', start: today.clone().add(32, 'hour') }
        ]);

        //Crear una timeline que se muestra en la hora local (predeterminado)
        this.timeline_timezoneLocal = new vis.Timeline(document.getElementById('utctime1'), items, {
          editable: true,
          start: start,
          end: end
        });
        this.timeline_timezoneLocal.addCustomTime(customTime);

        //Crear una timeline que se muestra en UTC
        this.timeline_timezoneUTC = new vis.Timeline(document.getElementById('utctime'), items, {
          editable: true,
          start: start,
          end: end,
          moment: function (date) {
            return vis.moment(date).utc();
          }
        });
        this.timeline_timezoneUTC.addCustomTime(customTime);

        //Crear una timeline que se muestra en UTC+08:00
        this.timeline_timezonePlus8 = new vis.Timeline(document.getElementById('utctime8'), items, {
          editable: true,
          start: start,
          end: end,
          moment: function (date) {
            var date1 = new Date(date);

            date1.setHours(date1.getHours() + 8)

            //return vis.moment(date).utcOffset('+08:00');
            return vis.moment(date1).utc();
          }
        });
        this.timeline_timezonePlus8.addCustomTime(customTime);

      } else {
        this.mostrar_timezone = true
      }
    }
  }

}
