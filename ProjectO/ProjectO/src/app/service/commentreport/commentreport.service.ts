import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { commentreport } from '../../model/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class CommentreportService {
 private url="http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

  CommentReport(callback){
    this.http.get(this.url+"usercomment").subscribe(data=>{
        console.log(data);
        return callback(data);
    })
  }

  CanCelBan(id:number,callback){
     this.http.put(this.url+"cancelban",id).subscribe(result=>{
       if(result){
        return callback(true);
       }else{
         return callback(false);
       }
     })
  }

  Banuser(userid:number,commentid:number,callback){
   let body = {idUser:userid,idUserComment:commentid}
    this.http.put(this.url+"banuser",body).subscribe(result=>{
      if(result){
        return callback(true);
       }else{
         return callback(false);
       }
    })
  }

  insertcomment(num,callback){
    let body = {collectComment:num}
    this.http.post(this.url+"insertcomment",body).subscribe(result=>{
      return callback(result);
    })
  }

  insertusercomment(v1,v2,v3,v4,callback){
    let body = {idUser:v1,idComment:v2,idBook:v3,idEpisode:v4}
    this.http.post(this.url+"insertusercomment",body).subscribe(result=>{
      return callback(result);
    })
  }
 
  listcomment(v1,v2,callback){
    let body ={idBook:v1,idEpisode:v2};
   this.http.put(this.url+"listcomment",body).subscribe(result=>{
     return callback(result);
   })
  }

  modifyusercomment(v1,v2,callback){
    let body ={collectComment:v1,idComment:v2};
    this.http.put(this.url+"modifyusercomment",body).subscribe(result=>{
      return callback(result);
    })
  }

  deleteusercomment(v1,v2,callback){
    let body ={idUser:v1,idComment:v2};
    this.http.put(this.url+"deleteusercomment",body).subscribe(result=>{
      return callback(result);
    })
  }

  reportusercomment(v1,v2,callback){
    let body ={idUserComment:v1,idComment:v2};
    this.http.put(this.url+"reportusercomment",body).subscribe(result=>{
      return callback(result);
    })
  }
}