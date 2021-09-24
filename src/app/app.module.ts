import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { SignupComponent } from './signup';
import { MasiComponent } from './masi';
import { BrvmComponent } from './brvm';



import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {TabsModule} from 'ngx-tabset';



@NgModule({
  declarations: [
    AppComponent,LoginComponent,HomeComponent,SignupComponent,MasiComponent,BrvmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,ChartsModule,NgxSpinnerModule,
    BrowserAnimationsModule,ReactiveFormsModule,TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

