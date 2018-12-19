import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { 
  HomeComponent,
  NavbarComponent,
  BasicUsageComponent,
  InteractionComponent,
  EditionComponent,
  ItemsComponent,
  GroupsComponent,
  StylingComponent,
  DataHandlingComponent,
  Pagina404Component
} from './components/index';

//Importaciones para angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { OtherComponent } from './components/other/other.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Pagina404Component,
    NavbarComponent,
    BasicUsageComponent,
    InteractionComponent,
    EditionComponent,
    ItemsComponent,
    GroupsComponent,
    StylingComponent,
    DataHandlingComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Importacion para angular material
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
