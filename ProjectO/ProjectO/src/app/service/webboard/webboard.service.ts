import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebboardService {
  url = "http://localhost:9999/user/";
  constructor(private http: HttpClient) { }

  GetTypeOne(callback) {
    this.http.get(this.url + "webboardtypeone").subscribe(result => {
      return callback(result);
    })
  }

  GetTypeTwo(callback) {
    this.http.get(this.url + "webboardtypetwo").subscribe(result => {
      return callback(result);
    })
  }

  GetTypeThree(callback) {
    this.http.get(this.url + "webboardtypethree").subscribe(result => {
      return callback(result);
    })
  }

  GetAllTypeOne(callback) {
    this.http.get(this.url + "webboardalltypeone").subscribe(result => {
      return callback(result);
    })
  }

  GetAllTypeTwo(callback) {
    this.http.get(this.url + "webboardalltypetwo").subscribe(result => {
      return callback(result);
    })
  }

  GetAllTypeThree(callback) {
    this.http.get(this.url + "webboardalltypethree").subscribe(result => {
      return callback(result);
    })
  }

  CreateWeb(body, callback) {
    this.http.post(this.url + "createwebboard", body).subscribe(result => {
      return callback(result);
    })
  }

  Createcommentwebboard(body, callback) {
    this.http.post(this.url + "createcommentwebboard", body).subscribe(result => {
      return callback(result);
    })
  }

  Commentwebboard(number, callback) {
    this.http.post(this.url + "commentwebboard", number).subscribe(result => {
      return callback(result);
    })
  }

  Typewebboard(number, callback) {
    this.http.post(this.url + "typewebboard", number).subscribe(result => {
      return callback(result);
    })
  }

  Getwebboardadminl3(callback) {
    this.http.get(this.url + "getwebboardadminl3").subscribe(result => {
      return callback(result);
    })
  }

  Getwebboardadmin(callback) {
    this.http.get(this.url + "getwebboardadmin").subscribe(result => {
      return callback(result);
    })
  }

  Getdesadminwebboard(body, callback) {
    this.http.post(this.url + "getdesadminwebboard", body).subscribe(result => {
      return callback(result);
    })
  }

  Createadminwebboard(body, callback) {
    this.http.post(this.url + "createadminwebboard", body).subscribe(result => {
      return callback(1);
    })
  }

  Checkwebboardreport(callback) {
    this.http.get(this.url + "checkwebboardreport").subscribe(result => {
      return callback(result);
    })
  }

  Webboardcancelban(num, callback) {
    let body = { idUserWebboard: num }
    console.log(body);
    this.http.put(this.url + "webboardcancelban", body).subscribe(result => {
      return callback(result)
    })
  }

  Webboardbanuser(num, callback) {
    let body = { idUserWebboard: num }
    this.http.put(this.url + "webboardbanuser", body).subscribe(result => {
      return callback(result);
    })
  }

  setStatus1(id, callback) {
    let body = { idWebboard:id }
    this.http.put(this.url + "setstatus1", body).subscribe(result => {
      return callback(1);
    })
  }

  reportCommentWebboard(v1,callback){
    let body = { idUserWebboard:v1 }
    this.http.put(this.url + "reportCommentWebboard", body).subscribe(result => {
      return callback(1);
    })
  }

  foradminsearchdelete(callback) {
    this.http.get(this.url + "foradminsearchdelete").subscribe(result => {
      return callback(result);
    })
  }

  admindeletewebboard(id, callback) {
    this.http.put(this.url + "admindeletewebboard", id).subscribe(result => {
      return callback(1);
    })
  }

  adminmodifywebboard(id, ids, v1, callback) {
    let body = { idAdminWebboard: id, headderWebboard: ids, collectWebboard: v1 }
    this.http.put(this.url + "adminmodifywebboard", body).subscribe(result => {
      return callback(1);
    })
  }

  usermodifywebboard(id, ids, v1, callback) {
    let body = { idWebboard: id, headderWebboard: ids, collectWebboard: v1 }
    this.http.put(this.url + "usermodifywebboard", body).subscribe(result => {
      return callback(1);
    })
  }

  usermodifycomment(id, ids, callback) {
    let body = { collectUserWebboard: id, idUserWebboard: ids }
    this.http.put(this.url + "usermodifycomment", body).subscribe(result => {
      return callback(1);
    })
  }

  userdeletecomment(id, callback) {
    let body = { idUserWebboard: id };
    this.http.put(this.url + "userdeletecomment", body).subscribe(result => {
      return callback(1);
    })
  }
}