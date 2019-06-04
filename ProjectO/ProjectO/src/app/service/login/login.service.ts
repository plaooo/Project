import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urls: string = "http://localhost:9999/admin/login";
  private url: string = "http://localhost:9999/user/login";

  constructor(private http: HttpClient) { }

  login(user: User, callback) {
    this.http.post(this.url, user).subscribe((data) => {
      console.log(data);
      if (data["auth"] != null) {
        localStorage.setItem('auth', data["auth"]);
        return callback(true);
      }else{
        return callback(false);
      }
    })
  }

  logout() {
    localStorage.removeItem('auth');
  }

  loginadmin(v1, v2, callback) {
    let body = { username: v1, password: v2 }
    this.http.post(this.urls, body).subscribe(data => {
      console.log(data);
      if (data["adminauth"] != null) {
        localStorage.setItem('adminauth', data["adminauth"]);
        return callback(true);
      } else {
        return callback(false);
      }
    })
  }

  logoutadmin(callback) {
    localStorage.removeItem('adminauth');
    return callback(true);
  }
}
