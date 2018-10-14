import { Routes } from '@angular/router';


import {AuthComponent} from "./components/auth/auth.component";
import {MapComponent} from "./components/board/map/map.component";
import {AuthGuard} from "./guards/auth.guard";

export const rootRouterConfig: Routes = [
  { path: '', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard]}
];
