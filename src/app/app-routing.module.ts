import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  HomeComponent, 
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basic_usage', component: BasicUsageComponent },
  { path: 'interaction', component: InteractionComponent},
  { path: 'editing', component: EditionComponent},
  { path: 'items', component: ItemsComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'styling', component: StylingComponent},
  { path: 'data_handling', component: DataHandlingComponent},
  { path: 'other', component: OtherComponent},
  { path: '**', component: Pagina404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
