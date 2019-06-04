import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { User } from 'src/app/model/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book/book.medel';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject(new User);
  userCurrent = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  createUserFavorBook(id_user, id_book) {
    let formData = new FormData()
    formData.append('id_user', id_user);
    formData.append('id_book', id_book);

    return this.http.post('http://localhost:9999/userfavorbook', formData);
  }

  deleteUserFavorBook(id_user, id_book) {
    return this.http.delete('http://localhost:9999/userfavorbook/' + id_user + '/' + id_book)
  }

  getFavorBook(id_user) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/userfavorbook/' + id_user)
  }

  updateUser(user: User, file: File){
    console.log(user);
    
    const form_data: FormData = new FormData();
    form_data.append('file', file);
    form_data.append('name', user.name);
    form_data.append('lastname', user.lastname);
    form_data.append('birthday', user.birthday.toString());
    form_data.append('avatar', user.avatar);
    form_data.append('panname', user.panname);
    form_data.append('id_user', user.id_user.toString());

    return  this.http.put('http://localhost:9999/user', form_data)
  }

  getstatusUser(id){
     return this.http.get('http://localhost:9999/user/'+ id)
  }

}
