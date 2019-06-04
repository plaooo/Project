import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url="http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

  forgetpassword(mail,callback){
    let body = {emailAddress:mail}
    this.http.post(this.url+"email",body).subscribe(result=>{
      return callback(1);
    })
  }

  changeemail(pass,id,callback){
    let body = {password:pass,idUser:id};
    this.http.put(this.url+"changeemail",body).subscribe(result=>{
      return callback(1);
    })
  }
}