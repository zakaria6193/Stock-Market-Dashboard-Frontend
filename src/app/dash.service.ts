import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  public host:string="http://127.0.0.1:5000/"
  public hostmasi:string="http://127.0.0.1:2000/"
  public hostbrvm:string="http://127.0.0.1:3000/"
  constructor(private http: HttpClient) { }

  public scrap(){

    return this.http.get(this.host+'scrap' ) 
  }
  public scrapbrvm(){

    return this.http.get(this.hostbrvm+'scrap' ) 
  }
  public scrapmasi(){

    return this.http.get(this.hostmasi+'scrap' ) 
  }
  public frombase(){

    return this.http.get(this.host+'getfrombase' ) 
  }

  public frombasebrvm(){

    return this.http.get(this.hostbrvm+'getfrombase' ) 
  }

  public frombasemasi(){

    return this.http.get(this.hostmasi+'getfrombase' ) 
  }
  public history(symb:string){
    return this.http.get(this.host+'history?symbol='+symb) 

  }

  public historical(symb:string){
    return this.http.get(this.host+'historical?symbol='+symb) 

  }
  public realhistoricalbrvm(symb:string){
    return this.http.get(this.hostbrvm+'realhistorical?symbol='+symb) 

  }

  public realhistoricalmasi(symb:string){
    return this.http.get(this.hostmasi+'realhistorical?symbol='+symb) 

  }
  public realhistorical(symb:string){
    return this.http.get(this.host+'realhistorical?symbol='+symb) 

  }
  public monthly(symb:string){
    return this.http.get(this.host+'monthly?symbol='+symb) 

  }
  public getpdf(symb:string){
    return this.http.get(this.host+'getpdf?symbol='+symb) 

  }
  public specificdate(symb:string,start:any,end:any){
    return this.http.get(this.host+'specificdate?symbol='+symb+'&start='+start+'&end='+end) 

  }
  public listhistoricalbrvm(symb:string[]){
    return this.http.get(this.hostbrvm+'listhistorical?symbol='+symb) 

  }

  public listhistoricalmasi(symb:string[]){
    return this.http.get(this.hostmasi+'listhistorical?symbol='+symb) 

  }
  public listhistorical(symb:string[]){
    return this.http.get(this.host+'listhistorical?symbol='+symb) 

  }
  public monthlylisthistorical(symb:string[]){
    return this.http.get(this.host+'monthlylisthistorical?symbol='+symb) 

  }
  public historicaltunindex(){
    return this.http.get(this.host+'historicaltunindex') 

  }

  public MAgetbrvm(symb:string,period:string){
    return this.http.get(this.hostbrvm+'MAget?symbol='+symb+'&per='+period) 

  }

  public MAgetmasi(symb:string,period:string){
    return this.http.get(this.hostmasi+'MAget?symbol='+symb+'&per='+period) 

  }
  public MAget(symb:string,period:string){
    return this.http.get(this.host+'MAget?symbol='+symb+'&per='+period) 

  }


  public MACDgetbrvm(symb:string,fast:string,slow:string,single:string){
    return this.http.get(this.hostbrvm+'MACDget?symbol='+symb+'&fast='+fast+'&slow='+slow+'&single='+single) 

  }

  public MACDgetmasi(symb:string,fast:string,slow:string,single:string){
    return this.http.get(this.hostmasi+'MACDget?symbol='+symb+'&fast='+fast+'&slow='+slow+'&single='+single) 

  }
  public MACDget(symb:string,fast:string,slow:string,single:string){
    return this.http.get(this.host+'MACDget?symbol='+symb+'&fast='+fast+'&slow='+slow+'&single='+single) 

  }

  public EMAgetbrvm(symb:string,period:string){
    return this.http.get(this.hostmasi+'EMAget?symbol='+symb+'&per='+period) 

  }

  public EMAgetmasi(symb:string,period:string){
    return this.http.get(this.hostmasi+'EMAget?symbol='+symb+'&per='+period) 

  }
  public EMAget(symb:string,period:string){
    return this.http.get(this.host+'EMAget?symbol='+symb+'&per='+period) 

  }
  public getus(){
    return this.http.get(this.host+'getus') 

  }
  public getdata(){
    return this.http.get(this.host+'getdata') 

  }

  public dailystore(){
    return this.http.get(this.host+'dailystore') 

  }

  public historicalcrypto(symb:string){
    return this.http.get(this.host+'gethistoricalcrypto?symbol='+symb) 

  }
  public dosignup(email:string,password:string){
    return this.http.get(this.host+'signup?email='+email+'&password='+password) 

  }
  public dologin(email:string,password:string){
    return this.http.get(this.host+'login?email='+email+'&password='+password) 

  }
}