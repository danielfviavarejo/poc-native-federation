import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'catalogo',
    loadComponent: () => loadRemoteModule('catalogo', './AppComponent').then((m) => m.AppComponent).catch((e) => console.error(e))
  },
];
