import { Component,OnInit, ViewChild,ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashService } from '../dash.service';
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
import { AppComponent } from '../app.component';



@Component({ templateUrl: 'home.component.html' })


export class HomeComponent implements OnInit{
  @ViewChild('content') content: ElementRef;
  public pdf:any

//function for capturing element as image and export it as pdf
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert') as HTMLCanvasElement;
html2canvas(data,{allowTaint:true,useCORS:true,width:window.screen.availWidth,height:window.screen.availHeight,
  windowWidth:document.body.scrollWidth,windowHeight:document.body.scrollHeight

}).then(canvas => {
  
// Few necessary setting options
var imgWidth = 900;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;

const contentDataURL = canvas.toDataURL('image/png')
this.pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

var width = this.pdf.internal.pageSize.getWidth()*1.8;
console.log(width)
var height = this.pdf.internal.pageSize.getHeight()*1.8;
var position = 0;
this.pdf.addImage(contentDataURL, 'PNG', 0, 0, 400, 298)
 // Generated PDF
});
var data2 = document.getElementById('contentToConvert2') as HTMLCanvasElement;
html2canvas(data2,{allowTaint:true,useCORS:true,width:window.screen.availWidth,height:window.screen.availHeight,
  windowWidth:document.body.scrollWidth,windowHeight:document.body.scrollHeight

}).then(canvas2 => {
  
// Few necessary setting options
var imgWidth = 900;
var pageHeight = 295;
var imgHeight = canvas2.height * imgWidth / canvas2.width;
var heightLeft = imgHeight;

const contentDataURL2 = canvas2.toDataURL('image/png')
this.pdf.addPage('p', 'mm', 'a4');

var width = this.pdf.internal.pageSize.getWidth()*1.8;
console.log(width)
var height = this.pdf.internal.pageSize.getHeight()*1.8;
var position = 0;
this.pdf.addImage(contentDataURL2, 'PNG', 0, 0, 400, 298)
this.pdf.save('new-file.pdf'); // Generated PDF
});
    
  } 
  
  //end function
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };


  name:any[]
  symbolreal:any[]
  pricereal:any[]
  market:any[]
  volreal:any[]
  chgreal:any[]

historicalhighcrypto:any[]
historicallowcrypto:any[]
historicalopencrypto:any[]
historicalclosecrypto:any[]
historicalvolumecrypto:any[]
historicaldatecrypto:any[]
historicalnewscrypto:any[]
predictioncrypto:any[]

messagecrypto:any

  namechart:any[]
  symbolchart:any[]
  pricechart:any[]
  marketchart:any[]
  volchart:any[]
  chgchart:any[]



//function to create a pie chart and bar chart for crypto currency

  public getchart(){
      
    this.Dash.getdata().subscribe(
      (response: any) => {
  
  
  this.namechart=response.name
  this.symbolchart=response.symbol
  this.pricechart=response.price
  this.marketchart=response.market
  this.volchart=response.vol
  this.chgchart=response.chg
  let dd: number[]=[]
  

          var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        let lstcolor:string[]=['rgba(0,0, 255, 0.2)','rgba(0,0, 255, 0.3)','rgba(0,0, 255, 0.4)','rgba(0,0, 255, 0.5)','rgba(0,0, 255, 0.6)','rgba(0,0, 255, 0.7)','rgba(0,0, 255, 0.8)','rgba(0,0,200, 0.2)','rgba(0,0,200, 0.3)','rgba(0,0,200, 0.4)','rgba(0,0,200, 0.5)','rgba(0,0,200, 0.6)','rgba(0,0,200, 0.7)','rgba(0,0,170, 0.2)','rgba(0,0,170, 0.4)','rgba(0,0,170, 0.6)']

          

         /**  this.volume.forEach(function(item){  
            dd.push(Number(item.replace(',','')))  
          }); */
          this.volchart.forEach(function(item){  
            dd.push(Number(item.replace('B','').replace('$','')))  
          }); 
          this.myctxcrypto = this.canvasRefpiecrypto.nativeElement.getContext('2d');
          this.myctxcrypto.canvas.width = window.innerWidth;
          this.myctxcrypto.canvas.height = window.innerWidth;
          this.chartpiecrypto = new Chart(this.myctxcrypto,{
            type:'pie',
            data:{
              labels:this.symbolchart,
              datasets:[{
                data:dd,
                backgroundColor:lstcolor


              }]
            },
            options:{}




          })

          this.myctxbarcrypto = this.canvasRefbarcrypto.nativeElement.getContext('2d');
          this.myctxbarcrypto.canvas.width = window.innerWidth;
          this.myctxbarcrypto.canvas.height = window.innerWidth;
          this.chartbarcrypto = new Chart(this.myctxbarcrypto,{
            type:'bar',
            
            data:{
              labels:this.symbolchart,
              datasets:[{
                label: 'Stock Market Today',
                data:dd,
                backgroundColor:lstcolor,
                


              }]
            },
            options:{
              legend: {
                labels: {
                  boxWidth: 0,
                }
              }
            }




          })
          console.log(dd)

  
      })
    
    }

   //end function 

   // function to get realtime data for crypto currency

  public getthedata(){
      
    this.Dash.getdata().subscribe(
      (response: any) => {
  
  
  this.name=response.name
  this.symbolreal=response.symbol
  this.pricereal=response.price
  this.market=response.market
  this.volreal=response.vol
  this.chgreal=response.chg
  

  
      })
    
    }
 //end function 



  display="none";
  display2="none";
  display3="none";
  displayMA="none";
  displayMACD="none";
  displayEMA="none";
  displayPDF="none"
  display13='none'

  line_options = { elements:{ line: {fill:false}}};

  //functions to handle the about application modal 
  openModalAbout(){
    this.display2='block'; //Set block css
 }
 closeModalAbout(){
  
  
 
  this.display2='none'; 
 }
  //end functions 


  // two functions to handle the cryptocurrency modal 
 openmodalcrypto(symbol:string){
  this.gethistoricalcrypto(symbol)
  console.log('im here again')
  this.display13='block'; 
}
closemodalcrypto(){

this.display13='none'; 
}
 //end function 

myctxlinecrypto:any
chartlinecrypto:any
@ViewChild('myCanvascrypto') canvasReflinecrypto: ElementRef;

myctxMAcrypto:any
chartMAcrypto:any
@ViewChild('myCanvasMAcrypto') canvasRefMAcrypto: ElementRef;



//get historical data for selected crypto currency
public gethistoricalcrypto(symbol:string){
  this.spinner.show();

  this.Dash.historicalcrypto(symbol+'-USD').subscribe(
    (response: any) => {

console.log('im here')
this.historicalopencrypto=response.Open
this.historicalhighcrypto=response.High
this.historicallowcrypto=response.Low
this.historicalvolumecrypto=response.Volume
this.historicalclosecrypto=response.Close
this.historicaldatecrypto=response.date
this.historicalnewscrypto=response.news
this.predictioncrypto=response.prediction
this.messagecrypto=response.message[0]


let jj:number=0

if (typeof(this.chartlinecrypto) != "undefined") {
  this.chartlinecrypto.destroy();}



let dd2:number[]=[]
this.historicalclosecrypto.forEach(function(item){  
  dd2.push(item)  
}); 


let monthlyMA:number[]=[]
    response.monthlyMA.forEach(function(item:any){  
      monthlyMA.push(Number(item.replace(',','')))  
    }); 
    let threeMA:number[]=[]
    response.threeMA.forEach(function(item:any){  
      threeMA.push(Number(item.replace(',','')))  
    }); 

    console.log(monthlyMA)


this.myctxlinecrypto = this.canvasReflinecrypto.nativeElement.getContext('2d');
this.myctxlinecrypto.canvas.width = window.innerWidth;
this.myctxlinecrypto.canvas.height = 400;
this.chartlinecrypto = new Chart(this.myctxlinecrypto,{
  type:'line',
  data:{
    labels:this.historicaldatecrypto,
    datasets:[{
      label: 'Price Per Day',
      data:dd2,
      backgroundColor:[
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
      borderColor: 'rgba(0,0, 255, 0.3)',
      borderWidth: 1



    }]
  },
  options:{
    responsive:true,
    

    elements: {
      point:{
          radius: 0
      },
      line: {
        
}


  },
  plugins:{
    zoom: {
      zoom:{
        drag:true,
        wheel: {
          enabled: true,
          mode:'xy'
        },
        pinch: {
          enabled: true,
          mode:'xy'
        },
      
      enabled: true,                      
      
      mode: 'xy'
    }, mode:'xy',
    pan:{
      enabled:true,
      mode:'xy'
    }
    
      
  }
  }
  
  
  }




})

this.myctxMAcrypto = this.canvasRefMAcrypto.nativeElement.getContext('2d');
          this.myctxMAcrypto.canvas.width = window.innerWidth;
          this.myctxMAcrypto.canvas.height = 400;
          this.chartMAcrypto = new Chart(this.myctxMAcrypto,{
            type:'line',
            data:{
              labels:this.historicaldatecrypto,
              datasets:[{
                label: 'Price Per Day',
                data:dd2,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
                borderColor: 'rgba(0,0, 255, 0.9)',
                borderWidth: 1



              },{
                label: 'Monthly MA',
                data:monthlyMA,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
                borderColor: 'rgba(0,0, 200, 0.7)',
                borderWidth: 1



              },{
                label: 'Three Month MA',
                data:threeMA,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
                borderColor: 'rgba(153,51, 255, 0.8)',
                borderWidth: 1



              }]
            },
            options:{
              

              elements: {
                point:{
                    radius: 0
                },
                line: {
                  fill:false
                  
          }
            }
            
            }




          })


console.log('im here third time')
this.spinner.hide();

    })

  
  }

  //end function

 public responsepdf:any
 public pricepdf:any[]

 //function for modal pdf ( show company informations  in modal window )
 openPDF(){
  this.sy = sessionStorage.getItem('symbole');
  this.Dash.getpdf(this.sy).subscribe(
    (response: any) => {
      
      this.responsepdf=response
      this.pricepdf=this.responsepdf.price
      console.log(this.pricepdf)
      if (typeof(this.chartlinepdf) != "undefined") {
        this.chartlinepdf.destroy();
    }
    if (typeof(this.chartlinepdfmacd) != "undefined") {
      this.chartlinepdfmacd.destroy();
  }
    let dd2:number[]=[]

      

      

    

      this.responsepdf.bigprice.forEach(function(item:any){  
        dd2.push(Number(item.replace(',','')))  
      }); 

      let ddline:number[]=[]

      

      

    

      this.responsepdf.line.forEach(function(item:any){  
        ddline.push(Number(item.replace(',','')))  
      }); 
      let ddsignal:number[]=[]

      

      

    

      this.responsepdf.signal.forEach(function(item:any){  
        ddsignal.push(Number(item.replace(',','')))  
      }); 

      this.myctxlinepdf = this.canvasReflinepdf.nativeElement.getContext('2d');
            this.myctxlinepdf.canvas.width = window.innerWidth;
            this.myctxlinepdf.canvas.height = 400;
            this.chartlinepdf = new Chart(this.myctxlinepdf,{
              type:'line',
              data:{
                labels:this.responsepdf.date,
                datasets:[{
                  label: 'Price Per Day',
                  data:dd2,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.3)',
                  borderWidth: 1



                }]
              },
              options:{
                responsive:true,
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
            
            
              },
              plugins:{
                zoom: {
                  zoom:{
                    drag:true,
                    wheel: {
                      enabled: true,
                      mode:'xy'
                    },
                    pinch: {
                      enabled: true,
                      mode:'xy'
                    },
                  
                  enabled: true,                      
                  
                  mode: 'xy'
                }, mode:'xy',
                pan:{
                  enabled:true,
                  mode:'xy'
                }
                
                  
              }
              }
              
              
              }




            })

            this.myctxlinepdfmacd = this.canvasReflinepdfmacd.nativeElement.getContext('2d');
            this.myctxlinepdfmacd.canvas.width = window.innerWidth;
            this.myctxlinepdfmacd.canvas.height = 400;
            this.chartlinepdfmacd = new Chart(this.myctxlinepdfmacd,{
              type:'line',
              data:{
                labels:this.responsepdf.macddate,
                datasets:[{
                  label: 'line',
                  data:ddline,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(200,0, 0, 0.7)',
                  borderWidth: 1



                },
                {
                  label: 'signal',
                  data:ddsignal,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0,0, 0.7)',
                  borderWidth: 1



                }]
              },
              options:{
                responsive:true,
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
            
            
              },
              plugins:{
                zoom: {
                  zoom:{
                    drag:true,
                    wheel: {
                      enabled: true,
                      mode:'xy'
                    },
                    pinch: {
                      enabled: true,
                      mode:'xy'
                    },
                  
                  enabled: true,                      
                  
                  mode: 'xy'
                }, mode:'xy',
                pan:{
                  enabled:true,
                  mode:'xy'
                }
                
                  
              }
              }
              
              
              }




            })


      
      
      

      
     
      
    }
   
  );
  this.displayPDF='block'; //Set block css
}
//end function

//close the modal window for pdf
closePDF(){



this.displayPDF='none'; 
}
//end function

// open modal window for dynamic moving average indicatior
 openModalMA(){
  this.displayMA='block'; //Set block css
}
closeModalMA(){



this.displayMA='none'; 
this.dispMAperiod=false
if (typeof(this.chartMAperiod) != "undefined") {
  this.chartMAperiod.destroy();
}

}
//end function

// open modal window for dynamic macd indicatior
openModalMACD(){
  this.displayMACD='block'; //Set block css
}
closeModalMACD(){



  this.displayMACD='none'; 
  this.dispMACD=false
  if (typeof(this.chartMACD) != "undefined") {
    this.chartMACD.destroy();
  }
}
//end function


resetzoomMA(){
  this.chartMAperiod.resetZoom()
}
resetzoomMACD(){
  this.chartMACD.resetZoom()
}
resetzoomEMA(){
  this.chartEMA.resetZoom()
}

// open modal window for dynamic EMA indicatior
openModalEMA(){
  this.displayEMA='block'; //Set block css
}
closeModalEMA(){



  this.displayEMA='none'; 
  this.dispEMA=false
  if (typeof(this.chartEMA) != "undefined") {
    this.chartEMA.destroy();
  }
}
//end function

// handle modal window for tunindex informations
 openModalTunindex(){
  this.display3='block'; //Set block css
  this.gethistoricaltunindex()
}
closeModalTunindex(){

  if (typeof(this.charttunindex) != "undefined") {
    this.charttunindex.destroy();
  }

this.display3='none'; 
}

//end function
  
  openModalDialog(){
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  if (sessionStorage.getItem("symblist") != null) {
        
    sessionStorage.removeItem('symblist');
    if (typeof(this.chartmultiline) != "undefined") {
      this.chartmultiline.destroy();
    }
    this.disp4=false
    
  }
  
 
  this.display='none'; //set none css after close dialog
 }
  
  
  public pieChartLabels: Label[]
  public pieChartData: SingleDataSet 
  public pieChartType: ChartType 
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public piechartcolor:any;
  public teststring:string="last"

  public resp3:any;
  public compan:string[]; 
  public chg:string[]; 
  public chgperc:string[]; 
  public symbol:string[]; 
  public type:string[]; 
  public last:string[]; 
  public date:string[];
  public news:any; 
  public resp:any;
  public volume:string[];
  

  public compan2:string[]; 
  public chg2:string[]; 
  public chgperc2:string[]; 
  public symbol2:string[]; 
  public type2:string[]; 
  public last2:string[]; 
  public date2:string[];
  public news2:any; 
  public resp2:any;
  public volume2:string[];
  public high:any
  public low:any
  public price:string[]
  public open:any
  public companynews:any

  public realopen:any;
  public reallow:any;
  public realhigh:any;
  public prediction:any;
  public sy:any;
  public price2:string[];
  public date3:any;
  public tuniprice:any;
  public tunichangeperc:any;
  public tuniopen:any;
  public tunivolume:any;
  public tunichange:any;

  public industry:any
  public sector:any
  public story:any


  public lstnews:any;
  public lstnews2:any;
  public id:any;
  public test:any;
  public i:number;
  public j:number;
  public resp4:any;
  public date4:any;
  public price4:string[];
  volumeimage:string='assets/images/volume.png'
  priceimage:string='assets/images/stockprice.png'
  openimage:string='assets/images/start.png'
  downimage:string='assets/images/arrowdown.png'
  pixlogo:string='assets/images/pixlogo2.png'
  tunisie:string='assets/images/tunisie.png'
  



  public vol:number[];
  public testcomp:string[]
  chartt:any
  chartpiecrypto:any
  myctx:any
  myctxcrypto:any
  today:any
  myctxbar:any
  myctxbarcrypto:any
  chartbar:any
  chartbarcrypto:any
  myctxline:any
  myctxlinepdf:any
  myctxlinepdfmacd:any
  myctxtunindex:any
  myctxMA:any
  myctxMAperiod:any
  myctxMACD:any
  myctxEMA:any
  chartMAperiod:any
  chartMACD:any
  chartEMA:any
  chartline:any
  chartlinepdf:any
  chartlinepdfmacd:any
  chartMA:any
  myctxmultiline:any
  chartmultiline:any
  charttunindex:any
  disp:any=false
  disp2:any=false
  disp3:any=false
  disp4:any=false
  disp5:any=false
  disppdf:any=false
  dispMAperiod:any=false
  dispMACD:any=false
  dispEMA:any=false
  public syy:any
  public selectede:any;
  public thelist:any[]
  public lstmultiple:string[]
  
   
  

  
  

  private updateSubscription: Subscription;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('myCanvaspiecrypto') canvasRefpiecrypto: ElementRef;
  @ViewChild('myCanvasbar') canvasRefbar: ElementRef;
  @ViewChild('myCanvasbarcrypto') canvasRefbarcrypto: ElementRef;
  @ViewChild('myCanvasline') canvasRefline: ElementRef;
  @ViewChild('myCanvasmultiline') canvasRefmultiline: ElementRef;
  @ViewChild('myCanvastunindex') canvasReftunindex: ElementRef;
  @ViewChild('myCanvasMA') canvasRefMA: ElementRef;
  @ViewChild('myCanvasMAperiod') canvasRefMAperiod: ElementRef;
  @ViewChild('myCanvasMACD') canvasRefMACD: ElementRef;
  @ViewChild('myCanvasEMA') canvasRefEMA: ElementRef;
  @ViewChild('myCanvaslinepdf') canvasReflinepdf: ElementRef;
  @ViewChild('myCanvaslinepdfmacd') canvasReflinepdfmacd: ElementRef;
  componentp:any
  constructor(comp:AppComponent,private Dash:DashService , private spinner: NgxSpinnerService){
    
    
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
      this.componentp=comp
    
  
  }
  
  time = new Date();
  rxTime = new Date();
  intervalId:any;
  subscription: Subscription;
  us:any


  
  //function sends requests to backend to scrap and store data in database
  public daily(){
  
    this.Dash.dailystore().subscribe(
      (response: any) => {
  
  
  
      })
    
    }





  ngOnInit():void{

    this.daily()
    const counter5 = interval(20000000000000000000);
          counter5.subscribe(
            (value:any) => {
              
             
             this.daily();
              
            }
            
          );



    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);


    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
      
     

    this.today = new Date().toLocaleDateString()
    this.getfrombase();

    
    

    const counter = interval(80000000000000000);
    counter.subscribe(
      (value:any) => {
        this.today = new Date().toLocaleDateString()
        this.getfrombase();
       
        
      }
      
    );
    this.getthedata()
    const counter3 = interval(4000);
          counter3.subscribe(
            (value:any) => {
              
             
             this.getthedata();
              
            }
            
          );

          this.getchart()
    const counter4 = interval(50000);
          counter4.subscribe(
            (value:any) => {
              
             
             this.getchart();
              
            }
            
          );
     
    
    
      }


      ngOnDestroy() {
        clearInterval(this.intervalId);
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }
      changeFunc(event:any){

        this.syy=sessionStorage.getItem('symbole');
        
        if (event.target.value=='daily'){

          this.gethistorical(this.syy)

        }

        if (event.target.value=='monthly'){
          this.onMonth();
        }

      }
      changeMultiple(event:any){

        this.lstmultiple=JSON.parse(sessionStorage.getItem('symblist')|| '{}');
        
        if (event.target.value=='daily'){

          this.Dailymultiplelines(this.lstmultiple)

        }

        if (event.target.value=='monthly'){
          this.Monthlymultiplelines(this.lstmultiple);
        }

      }
      
      public getfrombase(): void {
        
        this.Dash.frombase().subscribe(
          (response: any) => {
            console.log(response)
            this.resp = response;
            this.compan=this.resp.company;
            this.tuniprice=this.resp.tuniprice[0]
            this.tuniopen=this.resp.tuniopen[0]
            this.tunichangeperc=this.resp.tunichangeperc[0]
            this.tunivolume=this.resp.tunivolume[0]
            this.tunichange=this.resp.tunichange[0]
           
            this.chgperc=this.resp.chgperc;
            this.symbol=this.resp.symbols;
            this.type=this.resp.type;
            this.last=this.resp.last;
            this.date=this.resp.date
            this.realopen=this.resp.open
            this.reallow=this.resp.low
            this.realhigh=this.resp.high
            this.news=this.resp.news
            this.volume=this.resp.volume;
            let dd: number[]=[]
            


            this.spinner.hide();

            this.disp=true
            

            var dynamicColors = function() {
              var r = Math.floor(Math.random() * 255);
              var g = Math.floor(Math.random() * 255);
              var b = Math.floor(Math.random() * 255);
              return "rgb(" + r + "," + g + "," + b + ")";
          }
          let lstcolor:string[]=['rgba(0,0, 255, 0.2)','rgba(0,0, 255, 0.3)','rgba(0,0, 255, 0.4)','rgba(0,0, 255, 0.5)','rgba(0,0, 255, 0.6)','rgba(0,0, 255, 0.7)','rgba(0,0, 255, 0.8)','rgba(0,0,200, 0.2)','rgba(0,0,200, 0.3)','rgba(0,0,200, 0.4)','rgba(0,0,200, 0.5)','rgba(0,0,200, 0.6)','rgba(0,0,200, 0.7)','rgba(0,0,170, 0.2)','rgba(0,0,170, 0.4)','rgba(0,0,170, 0.6)']

            

           /**  this.volume.forEach(function(item){  
              dd.push(Number(item.replace(',','')))  
            }); */
            this.last.forEach(function(item){  
              dd.push(Number(item.replace(',','')))  
            }); 
            this.myctx = this.canvasRef.nativeElement.getContext('2d');
            this.myctx.canvas.width = window.innerWidth;
            this.myctx.canvas.height = window.innerWidth;
            this.chartt = new Chart(this.myctx,{
              type:'pie',
              data:{
                labels:this.compan,
                datasets:[{
                  data:dd,
                  backgroundColor:lstcolor


                }]
              },
              options:{}




            })

            this.myctxbar = this.canvasRefbar.nativeElement.getContext('2d');
            this.myctxbar.canvas.width = window.innerWidth;
            this.myctxbar.canvas.height = window.innerWidth;
            this.chartbar = new Chart(this.myctxbar,{
              type:'bar',
              
              data:{
                labels:this.symbol,
                datasets:[{
                  label: 'Stock Market Today',
                  data:dd,
                  backgroundColor:lstcolor,
                  


                }]
              },
              options:{
                legend: {
                  labels: {
                    boxWidth: 0,
                  }
                }
              }




            })
            this.disp3=true

            
           let tst2=this.teststring
            console.log(this.resp,this.vol);
            console.log(this.resp[tst2])
          },
         
        );
}
//end function
      

      
     //principal function that send request to backend function that scrap retrain models and stock data in database ( and show pie / bar chart)

      public getscrap(): void {
        
        this.Dash.scrap().subscribe(
          (response: any) => {
            
            this.getfrombase();
          },
         
        );
        
        
}
//end function


/**public gethistory(symb:string){
  this.spinner.show();
  this.Dash.history(symb).subscribe(
    (response: any) => {
      this.resp2 = response;
      this.compan2=this.resp2.company;
      this.chg2=this.resp2.chg;
      this.chgperc2=this.resp2.chgperc;
      this.symbol2=this.resp2.symbols;
      this.type2=this.resp2.type;
      this.last2=this.resp2.last;
      this.date2=this.resp2.date
      this.news2=this.resp2.news
      let str:string=this.news2+''
      let str2=str.split('],')
      let jj:number=0

      let newslist:any[]=[] ;
      let newslist2:any[]=[] ;
       /**str2.forEach(function(item:any){  
        newslist.push(item.split(',')[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }); */

      /**for(let item of str2){
        newslist.push(item .split(", '")[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        newslist2.push(String(item .split(", '")[1].replace("'","").replace("[","").replace('"','').replace('[','').replace("']","")))
       
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }
      this.lstnews=newslist
      this.lstnews2=newslist2*/
      


    /**   this.volume2=this.resp2.volume;
      this.disp2=true
      this.spinner.hide()


      let dd2:number[]=[]

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }*/

      

     /**  this.volume2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); */

     /**  this.last2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); 


      this.myctxline = this.canvasRefline.nativeElement.getContext('2d');
            this.myctxline.canvas.width = window.innerWidth;
            this.myctxline.canvas.height = window.innerWidth;
            this.chartline = new Chart(this.myctxline,{
              type:'line',
              data:{
                labels:this.date2,
                datasets:[{
                  data:dd2,
                  backgroundColor:dynamicColors


                }]
              },
              options:{}




            })

      
     
      console.log(this.resp2);
    },
   
  );


}*/

//function to get historical data for one tunisien company
public gethistorical(symb:string){
  this.spinner.show();
  this.Dash.realhistorical(symb).subscribe(
    (response: any) => {
      sessionStorage.clear();
      sessionStorage.setItem('symbole', symb.toUpperCase());
      

      
      this.resp2 = response;
      this.prediction=this.resp2.forecast;
      this.companynews=response.news
      
      this.chg2=this.resp2.change;
      this.vol=this.resp2.vol;
      this.high=this.resp2.high;
      this.low=this.resp2.low
      
      this.price=this.resp2.price;
      this.date2=this.resp2.date
      this.open=this.resp2.open

      this.industry=response.industry
      this.sector=response.sector
      this.story=response.story
      
      let jj:number=0

      let newslist:any[]=[] ;
      let newslist2:any[]=[] ;
       /**str2.forEach(function(item:any){  
        newslist.push(item.split(',')[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }); */

      /**for(let item of str2){
        newslist.push(item .split(", '")[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        newslist2.push(String(item .split(", '")[1].replace("'","").replace("[","").replace('"','').replace('[','').replace("']","")))
       
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }
      this.lstnews=newslist
      this.lstnews2=newslist2*/
      


      this.volume2=this.resp2.volume;
      this.disp2=true
      this.spinner.hide()
      document.getElementById("historicaldata")?.scrollIntoView();
      if (typeof(this.chartline) != "undefined") {
        this.chartline.destroy();
    }
    if (typeof(this.chartMA) != "undefined") {
      this.chartMA.destroy();
  }


      let dd2:number[]=[]

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

      

     /**  this.volume2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); */

      this.price.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); 


      let monthlyMA:number[]=[]
      response.monthlyMA.forEach(function(item:any){  
        monthlyMA.push(Number(item.replace(',','')))  
      }); 
      let threeMA:number[]=[]
      response.threeMA.forEach(function(item:any){  
        threeMA.push(Number(item.replace(',','')))  
      }); 



      this.myctxline = this.canvasRefline.nativeElement.getContext('2d');
            this.myctxline.canvas.width = window.innerWidth;
            this.myctxline.canvas.height = 400;
            this.chartline = new Chart(this.myctxline,{
              type:'line',
              data:{
                labels:this.date2,
                datasets:[{
                  label: 'Price Per Day',
                  data:dd2,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.3)',
                  borderWidth: 1



                }]
              },
              options:{
                responsive:true,
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
            
            
              },
              plugins:{
                zoom: {
                  zoom:{
                    drag:true,
                    wheel: {
                      enabled: true,
                      mode:'xy'
                    },
                    pinch: {
                      enabled: true,
                      mode:'xy'
                    },
                  
                  enabled: true,                      
                  
                  mode: 'xy'
                }, mode:'xy',
                pan:{
                  enabled:true,
                  mode:'xy'
                }
                
                  
              }
              }
              
              
              }




            })




            this.myctxMA = this.canvasRefMA.nativeElement.getContext('2d');
            this.myctxMA.canvas.width = window.innerWidth;
            this.myctxMA.canvas.height = 400;
            this.chartMA = new Chart(this.myctxMA,{
              type:'line',
              data:{
                labels:this.date2,
                datasets:[{
                  label: 'Price Per Day',
                  data:dd2,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.9)',
                  borderWidth: 1



                },{
                  label: 'Monthly MA',
                  data:monthlyMA,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 200, 0.7)',
                  borderWidth: 1



                },{
                  label: 'Three Month MA',
                  data:threeMA,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(153,51, 255, 0.8)',
                  borderWidth: 1



                }]
              },
              options:{
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    fill:false
                    
            }
              }
              
              }




            })

      
     
      console.log(this.resp2);
      console.log(this.resp2.price[3]);
    },
   
  );


}
//end function

//function get historical information from search bar

public onSearch(symb:string){
  this.spinner.show();
  this.Dash.realhistorical(symb.toUpperCase()).subscribe(
    (response: any) => {
      sessionStorage.clear();
      sessionStorage.setItem('symbole', symb.toUpperCase());

      this.resp2 = response;
      this.companynews=response.news
      this.prediction=this.resp2.forecast;
      this.chg2=this.resp2.change;
      this.vol=this.resp2.vol;
      this.high=this.resp2.high;
      this.low=this.resp2.low
      
      this.price=this.resp2.price;
      this.date2=this.resp2.date
      this.open=this.resp2.open
      
      let jj:number=0

      let newslist:any[]=[] ;
      let newslist2:any[]=[] ;
       /**str2.forEach(function(item:any){  
        newslist.push(item.split(',')[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }); */

      /**for(let item of str2){
        newslist.push(item .split(", '")[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        newslist2.push(String(item .split(", '")[1].replace("'","").replace("[","").replace('"','').replace('[','').replace("']","")))
       
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }
      this.lstnews=newslist
      this.lstnews2=newslist2*/
      


      this.volume2=this.resp2.volume;
      this.disp2=true
      this.spinner.hide()
      document.getElementById("historicaldata")?.scrollIntoView();
      if (typeof(this.chartline) != "undefined") {
        this.chartline.destroy();
    }


      let dd2:number[]=[]

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

      

     /**  this.volume2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); */

      this.price.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); 


      this.myctxline = this.canvasRefline.nativeElement.getContext('2d');
            this.myctxline.canvas.width = window.innerWidth;
            this.myctxline.canvas.height = 400;
            this.chartline = new Chart(this.myctxline,{
              type:'line',
              data:{
                labels:this.date2,
                datasets:[{
                  label: 'Price Per Day',
                  data:dd2,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.3)',
                  borderWidth: 1



                }]
              },
              options:{
                
                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              }
              }




            })

      
     
      console.log(this.resp2);
      console.log(this.resp2.price[3]);
    },
   
  );


}
// end function


//monthly line chart( monthly historical data on chart format)
public onMonth(){
  this.spinner.show();
  
  this.sy = sessionStorage.getItem('symbole');
  this.Dash.monthly(this.sy).subscribe(
    (response: any) => {
      
      this.resp3 = response;
      
      
      this.price2=this.resp3.price;
      this.date3=this.resp3.monthly;
      
      
      let jj:number=0

      let newslist:any[]=[] ;
      let newslist2:any[]=[] ;
       
      


      
      this.disp2=true
      this.spinner.hide()
      if (typeof(this.chartline) != "undefined") {
        this.chartline.destroy();
    }


      let dd3:number[]=[]

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

      

     /**  this.volume2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); */

      this.price2.forEach(function(item){  
        dd3.push(Number(item.replace(',','')))  
      }); 


      this.myctxline = this.canvasRefline.nativeElement.getContext('2d');
            this.myctxline.canvas.width = window.innerWidth;
            this.myctxline.canvas.height = 400;
            this.chartline = new Chart(this.myctxline,{
              type:'line',
              data:{
                labels:this.date3,
                datasets:[{
                  label: 'Price Per month',
                  data:dd3,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.3)',
                  borderWidth: 1



                }]
              },
              options:{
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              }
              }




            })

      
     
      
    },
   
  );



}
// end function


//historical data between date range

public onDate(thedate:any){
  this.spinner.show();
  
  this.sy = sessionStorage.getItem('symbole');
  this.Dash.specificdate(this.sy,thedate.start,thedate.end).subscribe(
    (response: any) => {
      
      this.resp4 = response;
      
      
      this.price4=this.resp4.price;
      this.date4=this.resp4.newdate;
      
      
      let jj:number=0

      let newslist:any[]=[] ;
      let newslist2:any[]=[] ;
       
      


      
      this.disp2=true
      this.spinner.hide()
      if (typeof(this.chartline) != "undefined") {
        this.chartline.destroy();
    }


      let dd4:number[]=[]

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

      

     /**  this.volume2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); */

      this.price4.forEach(function(item){  
        dd4.push(Number(item.replace(',','')))  
      }); 


      this.myctxline = this.canvasRefline.nativeElement.getContext('2d');
            this.myctxline.canvas.width = window.innerWidth;
            this.myctxline.canvas.height = 400;
            this.chartline = new Chart(this.myctxline,{
              type:'line',
              data:{
                labels:this.date4,
                datasets:[{
                  label: 'Price Per month',
                  data:dd4,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.3)',
                  borderWidth: 1



                }]
              },
              options:{

                
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              }
              }
              




            })

      
     
      
    },
   
  );
console.log(this.resp4)

}
// endfunction


// multi visualization for multi prices
public Multiplelines(symb:string){
  this.spinner.show();
  let lstsymb:string[]=[]

      if (sessionStorage.getItem("symblist") != null) {
        
        lstsymb= JSON.parse(sessionStorage.getItem('symblist')|| '{}');
        lstsymb.push(symb)
        sessionStorage.setItem('symblist',JSON.stringify(lstsymb))
        
      }
      else{

      lstsymb.push(symb)
      sessionStorage.setItem('symblist',JSON.stringify(lstsymb))
     }
  
  this.Dash.listhistorical(lstsymb).subscribe(
    (response: any) => {
      

      
      
     

      
      


     

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
   
let thedatasets:any[]=[]
let lstcolor:string[]=['rgba(0,0, 255, 0.2)','rgba(0,0, 255, 0.3)','rgba(0,0, 255, 0.4)','rgba(0,0, 255, 0.5)','rgba(0,0, 255, 0.6)','rgba(0,0, 255, 0.7)','rgba(0,0, 255, 0.8)','rgba(0,0,0, 0.7)','rgba(0,0,0, 0.6)',]
      let ii:number=0
      
      lstsymb.forEach(function(item:any){  
        let dd2:number[]=[]
        let s=item.toUpperCase( )
        response[s].forEach(function(item2:any){  
          dd2.push(Number(item2.replace(',','')))  
        }); 
        var color:string
        if (sessionStorage.getItem("color"+s) != null) {
        
          color= sessionStorage.getItem('color'+s)||'';
          
          
        }
        else{
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
        color="rgb(" + r + "," + g + "," + b + ")";
        sessionStorage.setItem('color'+s,color)
       }

        thedatasets.push({
          label:s,
          data:dd2,
         
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
          
                  
              borderColor: lstcolor[ii],
              borderWidth: 2



        })
        ii=ii+1
      }); 
      
      this.disp4=true
      this.spinner.hide()
      let alldates:any[]=[]
      alldates=response.date
     
    var data = {
      labels:alldates,
      datasets:thedatasets
    };
    

if (typeof(this.chartmultiline) != "undefined") {
  this.chartmultiline.destroy();
}

      
      
      this.myctxmultiline = this.canvasRefmultiline.nativeElement.getContext('2d');
      this.myctxmultiline.canvas.width = window.innerWidth;
      this.myctxmultiline.canvas.height = window.innerWidth;
            
      this.chartmultiline = new Chart(this.myctxmultiline,{
              type:'line',
              data:data,
              options:{

                
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              }
              }
              




            })
            
            
          

      
     
      
    },
   
  );


}

//end function 


// daily multi visualization for historical data
public Dailymultiplelines(lstsymb:string[]){
  this.spinner.show();
  
  
  this.Dash.listhistorical(lstsymb).subscribe(
    (response: any) => {
      

      
      
     

      
      


     

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
   
let thedatasets:any[]=[]
let lstcolor:string[]=['rgba(0,0, 255, 0.2)','rgba(0,0, 255, 0.3)','rgba(0,0, 255, 0.4)','rgba(0,0, 255, 0.5)','rgba(0,0, 255, 0.6)','rgba(0,0, 255, 0.7)','rgba(0,0, 255, 0.8)','rgba(0,0,0, 0.7)','rgba(0,0,0, 0.6)',]
      let ii:number=0
      
      lstsymb.forEach(function(item:any){  
        let dd2:number[]=[]
        let s=item.toUpperCase( )
        response[s].forEach(function(item2:any){  
          dd2.push(Number(item2.replace(',','')))  
        }); 
        var color:string
        if (sessionStorage.getItem("color"+s) != null) {
        
          color= sessionStorage.getItem('color'+s)||'';
          
          
        }
        else{
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
        color="rgb(" + r + "," + g + "," + b + ")";
        sessionStorage.setItem('color'+s,color)
       }

        thedatasets.push({
          label:s,
          data:dd2,
         
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
          
                  
              borderColor: lstcolor[ii],
              borderWidth: 2



        })
        ii=ii+1
      }); 
      
      this.disp4=true
      this.spinner.hide()
      let alldates:any[]=[]
      alldates=response.date
     
    var data = {
      labels:alldates,
      datasets:thedatasets
    };
    

if (typeof(this.chartmultiline) != "undefined") {
  this.chartmultiline.destroy();
}

      
      
      this.myctxmultiline = this.canvasRefmultiline.nativeElement.getContext('2d');
      this.myctxmultiline.canvas.width = window.innerWidth;
      this.myctxmultiline.canvas.height = window.innerWidth;
            
      this.chartmultiline = new Chart(this.myctxmultiline,{
              type:'line',
              data:data,
              options:{

                
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              }
              }
              




            })
            
            
          

      
     
      
    },
   
  );


}
//end function

// monthly multi visualization for historical data
public Monthlymultiplelines(lstsymb:string[]){
  this.spinner.show();
  
  
  this.Dash.monthlylisthistorical(lstsymb).subscribe(
    (response: any) => {
      

      
      
     

      
      


     

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
   
let thedatasets:any[]=[]
let lstcolor:string[]=['rgba(0,0, 255, 0.2)','rgba(0,0, 255, 0.3)','rgba(0,0, 255, 0.4)','rgba(0,0, 255, 0.5)','rgba(0,0, 255, 0.6)','rgba(0,0, 255, 0.7)','rgba(0,0, 255, 0.8)','rgba(0,0,0, 0.7)','rgba(0,0,0, 0.6)',]
      let ii:number=0
      lstsymb.forEach(function(item:any){ 

        let dd2:number[]=[]
        let s=item.toUpperCase( )
        response[s].forEach(function(item2:any){  
          dd2.push(Number(item2.replace(',','')))  
        }); 
        var color:string
        if (sessionStorage.getItem("color"+s) != null) {
        
          color= sessionStorage.getItem('color'+s)||'';
          
          
        }
        else{
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
        color="rgb(" + r + "," + g + "," + b + ")";
        sessionStorage.setItem('color'+s,color)
       }

        thedatasets.push({
          label:s,
          data:dd2,
         
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
          
                  
              borderColor: lstcolor[ii],
              borderWidth: 2



        })
        ii=ii+1
      }); 
      
      this.disp4=true
      this.spinner.hide()
      let alldates:any[]=[]
      alldates=response.date
     
    var data = {
      labels:alldates,
      datasets:thedatasets
    };
    

if (typeof(this.chartmultiline) != "undefined") {
  this.chartmultiline.destroy();
}

      
      
      this.myctxmultiline = this.canvasRefmultiline.nativeElement.getContext('2d');
      this.myctxmultiline.canvas.width = window.innerWidth;
      this.myctxmultiline.canvas.height = window.innerWidth;
            
      this.chartmultiline = new Chart(this.myctxmultiline,{
              type:'line',
              data:data,
              options:{

                
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              }
              }
              




            })
            
            
          

      
     
      
    },
   
  );


}
//end function


//get informations on tuni index ( line chart for historical data)
public gethistoricaltunindex(){
  this.spinner.show();
  this.Dash.historicaltunindex().subscribe(
    (response: any) => {
      
      

      
      
      
      let jj:number=0

      let newslist:any[]=[] ;
      let newslist2:any[]=[] ;
       /**str2.forEach(function(item:any){  
        newslist.push(item.split(',')[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }); */

      /**for(let item of str2){
        newslist.push(item .split(", '")[0].replace("'","").replace("[","").replace('"','').replace('[','').replace("']",""))
        newslist2.push(String(item .split(", '")[1].replace("'","").replace("[","").replace('"','').replace('[','').replace("']","")))
       
        jj=jj+1
        if (jj==5) {
          
          break;
        }
      }
      this.lstnews=newslist
      this.lstnews2=newslist2*/
      


      
      this.disp5=true
      this.spinner.hide()
      if (typeof(this.charttunindex) != "undefined") {
        this.charttunindex.destroy();
    }


      let dd2:number[]=[]

      var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

      

     /**  this.volume2.forEach(function(item){  
        dd2.push(Number(item.replace(',','')))  
      }); */

      response.price.forEach(function(item:any){  
        dd2.push(Number(item.replace(',','')))  
      }); 


      this.myctxtunindex = this.canvasReftunindex.nativeElement.getContext('2d');
            this.myctxtunindex.canvas.width = window.innerWidth;
            this.myctxtunindex.canvas.height = window.innerWidth;
            this.charttunindex = new Chart(this.myctxtunindex,{
              type:'line',
              data:{
                labels:response.date,
                datasets:[{
                  label: 'TUNINDEX',
                  data:dd2,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.3)',
                  borderWidth: 1



                }]
              },
              options:{
                responsive:true,

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    
            }
              },
              plugins:{
                zoom: {
                  zoom: {
                    enabled:true,
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'xy',
                  }
                }
              }
              }




            })

      
     
     
    },
   
  );


}
// end function


// moving average chart

public MAprocess(MA:any){
  this.spinner.show();
  
  
  this.Dash.MAget(MA.symb,MA.per).subscribe(
    (response: any) => {


      
     let MAdata:number[]=[]
      response.MA.forEach(function(item:any){  
        MAdata.push(Number(item.replace(',','')))  
      }); 
      let simpleprice:number[]=[]
      response.price.forEach(function(item:any){  
        simpleprice.push(Number(item.replace(',','')))  
      }); 

      this.dispMAperiod=true
      this.spinner.hide()
      if (typeof(this.chartMAperiod) != "undefined") {
        this.chartMAperiod.destroy();
    }



      this.myctxMAperiod = this.canvasRefMAperiod.nativeElement.getContext('2d');
            this.myctxMAperiod.canvas.width = window.innerWidth;
            this.myctxMAperiod.canvas.height = 400;
            this.chartMAperiod = new Chart(this.myctxMAperiod,{
              type:'line',
              data:{
                labels:response.date,
                datasets:[{
                  label: 'Price Per Day',
                  data:simpleprice,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.7)',
                  borderWidth: 1



                },
                {
                  label: 'MA',
                  data:MAdata,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 170, 0.9)',
                  borderWidth: 1



                }]
              },
              options:{
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    fill:false
            }
              },
              plugins:{
                zoom: {
                  zoom: {
                    enabled:true,
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'xy',
                  }
                }
              }
              
              }




            })

      
     
      
    },
   
  );


}
// end function

// macd chart 
public MACDprocess(MACD:any){
  this.spinner.show();
  
  
  this.Dash.MACDget(MACD.symb,MACD.fast,MACD.slow,MACD.single).subscribe(
    (response: any) => {


      
     let line:number[]=[]
      response.line.forEach(function(item:any){  
        line.push(Number(item.replace(',','')))  
      }); 

      let signal:number[]=[]
      response.signal.forEach(function(item:any){  
        signal.push(Number(item.replace(',','')))  
      }); 


      let simpleprice:number[]=[]
      response.price.forEach(function(item:any){  
        simpleprice.push(Number(item.replace(',','')))  
      }); 

      this.dispMACD=true
      this.spinner.hide()
      if (typeof(this.chartMACD) != "undefined") {
        this.chartMACD.destroy();
    }



      this.myctxMACD = this.canvasRefMACD.nativeElement.getContext('2d');
            this.myctxMACD.canvas.width = window.innerWidth;
            this.myctxMACD.canvas.height = 400;
            this.chartMACD= new Chart(this.myctxMACD,{
              type:'line',
              data:{
                labels:response.date,
                datasets:[
                {
                  label: 'line',
                  data:line,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(200,0, 0, 0.7)',
                  borderWidth: 1



                },{
                  label: 'signal',
                  data:signal,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0,0, 0.7)',
                  borderWidth: 1



                }]
              },
              options:{
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    fill:false
            }
              },
              plugins:{
                zoom: {
                  zoom: {
                    enabled:true,
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'xy',
                  }
                }
              }
              
              }




            })

      
     
      
    },
   
  );


}

// end function


// ema chart

public EMAprocess(EMA:any){
  this.spinner.show();
  
  
  this.Dash.EMAget(EMA.symb,EMA.per).subscribe(
    (response: any) => {


      
     let EMAdata:number[]=[]
      response.EMA.forEach(function(item:any){  
        EMAdata.push(Number(item.replace(',','')))  
      }); 
      let simpleprice:number[]=[]
      response.price.forEach(function(item:any){  
        simpleprice.push(Number(item.replace(',','')))  
      }); 

      this.dispEMA=true
      this.spinner.hide()
      if (typeof(this.chartEMA) != "undefined") {
        this.chartEMA.destroy();
    }



      this.myctxEMA = this.canvasRefEMA.nativeElement.getContext('2d');
            this.myctxEMA.canvas.width = window.innerWidth;
            this.myctxEMA.canvas.height = 400;
            this.chartEMA = new Chart(this.myctxEMA,{
              type:'line',
              data:{
                labels:response.date,
                datasets:[{
                  label: 'Price Per Day',
                  data:simpleprice,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 255, 0.7)',
                  borderWidth: 1



                },
                {
                  label: 'EMA',
                  data:EMAdata,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: 'rgba(0,0, 170, 0.9)',
                  borderWidth: 1



                }]
              },
              options:{
                

                elements: {
                  point:{
                      radius: 0
                  },
                  line: {
                    fill:false
            }
              },
              plugins:{
                zoom: {
                  zoom: {
                    enabled:true,
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'xy',
                  }
                }
              }
              
              }




            })

      
     
      
    },
   
  );


}
// end function
realtimeprice:any

public getuss(){
  
  this.Dash.getus().subscribe(
    (response: any) => {

this.us=response.us
this.realtimeprice=this.us[0]

    })
  
  }

}