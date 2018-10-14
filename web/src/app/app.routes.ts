import { Routes } from '@angular/router';


import {AuthComponent} from "./components/auth/auth.component";
import {MapComponent} from "./components/board/map/map.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/common/not-found/not-found.component";

export const rootRouterConfig: Routes = [
  { path: '', component: AuthComponent},
  { path: 'auth', component: AuthComponent },
  {path: '**', component: NotFoundComponent }
];
