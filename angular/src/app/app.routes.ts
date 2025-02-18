import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { DemoComponent } from './user/play/demo/demo.component';
import { DbtestComponent } from './user/dbtest/dbtest.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dbtest', component: DbtestComponent },
  { path: 'play/demo', component: DemoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
