import { Component } from '@angular/core';
import { DashService } from '../dash.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval, Subscription,observable, timer } from 'rxjs';
import {Router} from '@angular/router';
@Component({ templateUrl: 'login.component.html' })
export class LoginComponent {
    public symbol:any
    constructor(private router:Router,private Dash:DashService,private route:ActivatedRoute ){
    
        
    
  

    }

    login(data:any) {
        
        this.Dash.dologin(data.emailid,data.passwd).subscribe(
            (response: any) => {
              if (response.resp[0]=="done successfully"){
                  this.router.navigateByUrl('/home')
              }
              else{
                  this.router.navigateByUrl('/login')
              }
            },
           
          );
     }}