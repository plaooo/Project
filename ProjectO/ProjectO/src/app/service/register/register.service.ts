import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private customersUrl = 'http://localhost:9999/user';  // URL to web API
  private header = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  createUser(user: User, file: File) {

    const form_data: FormData = new FormData();
    form_data.append('file', file);
    form_data.append('name', user.name);
    form_data.append('lastname', user.lastname);
    form_data.append('birthday', user.birthday.toString());
    form_data.append('avatar', user.avatar);
    form_data.append('email', user.email);
    form_data.append('panname', user.panname);
    form_data.append('password', user.password);

    return this.http.post(this.customersUrl, form_data);
  }
}
