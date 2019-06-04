import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TotalcommentService {
   url= "http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

  CommentYear(callback){
      this.http.get(this.url+"commentofyear").subscribe((result)=>{
        return callback(result);
      })
  }

  CommentMonth(callback){
    this.http.get(this.url+"commentofmonth").subscribe((result)=>{
      return callback(result);
    })
  }

  CommentDay(callback){
    this.http.get(this.url+"commentofday").subscribe((result)=>{
      return callback(result);
    })
  }
}