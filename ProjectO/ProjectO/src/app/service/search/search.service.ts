import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = "http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

   SearchAll(callback){  
     console.log('12');
     
     this.http.get(this.url+"searchall").subscribe(result=>{
       console.log(result);
       console.log('16');
       
      return callback(result);
     })
   }

}