import { Component } from '@angular/core';
import { DashService } from '../dash.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval, Subscription,observable, timer } from 'rxjs';
import {Router} from '@angular/router';
@Component({ templateUrl: 'signup.component.html' })
export class SignupComponent {
    public symbol:any
    constructor(private router:Router,private Dash:DashService,private route:ActivatedRoute ){
    
        
    
  

    }
    
    signup(data:any) {
        
        this.Dash.dosignup(data.emailid,data.passwd).subscribe(
            (response: any) => {
                console.log(response)
              if (response.resp[0]=="done successfully"){
                  this.router.navigateByUrl('/')
              }
              else{
                  this.router.navigateByUrl('/signup')
              }
            },
           
          );
     }
}