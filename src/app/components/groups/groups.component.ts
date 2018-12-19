import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import { ViewEncapsulation } from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  //Booleans para mostrar o ocultar
  public mostrar_groups: boolean = false;

  //Timeline para cada uno
  public timeline_groups: any;

  constructor() { }

  ngOnInit() {
  }

  groups() {
    //variable true
    if (this.mostrar_groups == true) {
      this.mostrar_groups = false
      //Timeline vacio
      this.timeline_groups = new vis.Timeline();

    } else if (this.mostrar_groups == false) {
      if (this.timeline_groups == undefined) {
        //lo muestra
        this.mostrar_groups = true

        //Codigo
        //Fecha de referencia
        var date = new Date();

        //Creamos los nombres de los grupos
        var names = ['Tony Stark', 'Bruce Banner', 'Thor Odinson', 'Hank Pym'];

        //Numero de items total
        var itemCount = 20;

        //Numero de grupos que tendremos dependiendo de los nombres
        var groupCount = names.length;
        //Gramos el dataset donde iran los grupos
        var groups = new vis.DataSet();

        //Recorremos el numero de grupos
        for (var g = 0; g < groupCount; g++) {
          //Cada grupo lo assignamos a groups
          groups.add({ id: g, content: names[g] });
        }

        //Creacion data set de los items
        var items = new vis.DataSet();
        //Recorremos el numero de items
        for (var i = 0; i < itemCount; i++) {
          //Generamos un numero random
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

          //Creamos una nueva fecha a partir del numero random
          var start = new Date(date);

          //Selecionamos un grupo aleatorio
          var group = Math.floor(Math.random() * groupCount);

          //Añadimos el item
          items.add({
            id: i,
            group: group,
            //Contenido
            content: 'Item ' + (i + 1) + ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
            start: start,
            type: 'box'
          });
        }

        //Cogemos el elemento con id "groups"
        var container = document.getElementById('groups');
        //Configuramos las opciones
        var options = {
          groupOrder: 'content',
          //se podra editar el tiempo, pero no cambiar grupo ni eliminar
          editable: { updateTime: true, updateGroup: false, remove: false }
        };

        //Se crea el timeline en el contenedor
        this.timeline_groups = new vis.Timeline(container);
        //Se añaden las opciones
        this.timeline_groups.setOptions(options);
        //Se añaden los grupos
        this.timeline_groups.setGroups(groups);
        //Se añaden los items
        this.timeline_groups.setItems(items);


      } else {
        this.mostrar_groups = true
      }
    }
  }

}
