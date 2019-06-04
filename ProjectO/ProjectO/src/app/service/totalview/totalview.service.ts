import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TotalviewService {
  url ="http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

   ViewDay(callback){
     this.http.get(this.url+"viewoftheday").subscribe((result)=>{
       return callback(result);
     })
   }

   ViewMonth(callback){
    this.http.get(this.url+"viewofthemonth").subscribe((result)=>{
      console.log(result);
      
      return callback(result);
    })
  }

  ViewYear(callback){
    this.http.get(this.url+"viewoftheyear").subscribe((result)=>{
      return callback(result);
    })
  }
}