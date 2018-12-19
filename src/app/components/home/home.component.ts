import { Component, OnInit } from '@angular/core';
//Para aplicar los estilos CSS
import { ViewEncapsulation } from '@angular/core';
//Declaracion de la variable vis para crear los timeline
declare var vis: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //Añadido para que aplique el CSS
  //encapsulation: ViewEncapsulation.None,
  //encapsulation: ViewEncapsulation.Emulated,
  //encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
