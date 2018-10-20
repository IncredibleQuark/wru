import { Routes } from '@angular/router';


import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/common/not-found/not-found.component";
import {MainComponent} from "./components/board/main/main.component";

export const rootRouterConfig: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: MainComponent},
  {path: '**', component: NotFoundComponent }
];
