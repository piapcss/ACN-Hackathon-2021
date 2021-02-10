import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CalcuComponent } from './calcu/calcu.component';
import { DisplayComponent } from './display/display.component';


const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: DisplayComponent },
  { path: 'calculator', component: CalcuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
