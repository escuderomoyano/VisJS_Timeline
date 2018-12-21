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
  OtherComponent,
  Pagina404Component
} from './components/index';

//Importaciones para angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

//Angular Flex-Layout
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BasicUsageComponent,
    InteractionComponent,
    EditionComponent,
    ItemsComponent,
    GroupsComponent,
    StylingComponent,
    DataHandlingComponent,
    OtherComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Importacion para angular material
    BrowserAnimationsModule,
    MaterialModule,
    //Angular Flex
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
