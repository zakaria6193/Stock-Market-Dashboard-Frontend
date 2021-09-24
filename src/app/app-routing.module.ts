import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { SignupComponent } from './signup';
import { MasiComponent } from './masi';
import { BrvmComponent } from './brvm';

const routes: Routes = [
  {path:'',component:LoginComponent}

,{path:'home',component:HomeComponent}

,{path:'signup',component:SignupComponent}

,{path:'masi',component:MasiComponent}
,{path:'brvm',component:BrvmComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
