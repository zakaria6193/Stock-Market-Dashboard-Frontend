import { Component,OnInit, ViewChild,ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashService } from './dash.service';
import { Observable, interval, Subscription,observable, timer } from 'rxjs';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip ,Colors} from 'ng2-charts';
import * as Chart from 'chart.js';
import { map, catchError, share } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup } from '@angular/forms';
import 'hammerjs'
import 'chartjs-plugin-zoom'
import { jsPDF } from "jspdf";  
import html2canvas from 'html2canvas'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dashboardonecomp2';
  respbrvm:any
  respmasi:any
  public resptuni:any
 
  constructor(private Dash:DashService , private spinner: NgxSpinnerService){
    
   
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
    
  

}
ngOnInit():void{
 

  
    this.getscraptuni();
    this.getscrapmasi();
    this.getscrapbrvm();
    
    

    const counter = interval(80000000000000000);
    counter.subscribe(
      (value:any) => {
        
       
       
       this.getscrapmasi();
       
        
      }
      
    );




    

    
    

    const counter2 = interval(80000000000000000);
    counter2.subscribe(
      (value:any) => {
        
     
       
       this.getscrapbrvm();
       
        
      }
      
    );


    

    
    

    const counter3 = interval(80000000000000000);
    counter3.subscribe(
      (value:any) => {
        
     
       
       this.getscraptuni();
       
        
      }
      
    );
}




  public getscrapbrvm(): void {
        
    this.Dash.scrapbrvm().subscribe(
      (response: any) => {
        
        this.getfrombasebrvm();
      },
     
    );
    
    
}
public getfrombasebrvm(): void {
        
  this.Dash.frombasebrvm().subscribe(
    (response1: any) => {
      this.respbrvm=response1
      
    })  
}

public dobrvm() {
  return this.respbrvm;
}

public getscrapmasi(): void {
        
  this.Dash.scrapmasi().subscribe(
    (response: any) => {
      
      this.getfrombasemasi();
    },
   
  );
  
  
}
public getfrombasemasi(): void {
      
this.Dash.frombasemasi().subscribe(
  (response2: any) => {
    this.respmasi=response2
   
  })  
}

public domasi() {
return this.respmasi;
}



public getscraptuni(): void {
        
  this.Dash.scrap().subscribe(
    (response: any) => {
      
      this.getfrombasetuni();
    },
   
  );
  
  
}
public getfrombasetuni() :void{
      
this.Dash.frombase().subscribe(
  (response3: any) => {
    this.resptuni=response3
   
    
    
  })  
  
}

public dotuni() {
return this.resptuni;
}

}
