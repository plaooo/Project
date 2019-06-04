import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TotallikeService {
private url = "http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

  TopLikeDay(callback){
    this.http.get(this.url+"likeoftheday").subscribe((result)=>{
    return callback(result);
    })
  }
   
  TopLikeMonth(callback){
    this.http.get(this.url+"likeofthemonth").subscribe((result)=>{
      return callback(result);
    })
  }

  TopLikeYear(callback){
    this.http.get(this.url+"likeoftheyear").subscribe((result)=>{
      return callback(result);
    })
  }
}
