//Archivo por separado donde ira cada componente del angular material
import {
    MatToolbarModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    //Para usar los modulos de angular material
    imports: [
        MatToolbarModule, 
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule
    ],
    //Para exportar los modulos
    exports: [
        MatToolbarModule, 
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule
    ],
})
export class MaterialModule { }