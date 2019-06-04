import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = "http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

   SearchAll(callback){  
     this.http.get(this.url+"searchall").subscribe(result=>{
      return callback(result);
     })
   }

}