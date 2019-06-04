import { Injectable } from '@angular/core';
import { Book } from 'src/app/model/book/book.medel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/model/episode/episode.model';
import { Typebook } from 'src/app/model/typebook/typebook';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  book: Book;

  constructor(private http: HttpClient) { }

  createBook(formData: FormData) {
    console.log(formData);

    return this.http.post('http://localhost:9999/book', formData);
  }

  getBookByUser(id_user) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/' + id_user).pipe();
  }

  createEpisode(episode: Episode) {
    console.log('27');

    return this.http.post('http://localhost:9999/episode', episode);
  }

  getEpisodeByID(id_book, id_user) {
    return <Observable<Episode[]>>this.http.get('http://localhost:9999/episodes/' + id_book + '/' + id_user).pipe();
  }

  getTypeBook() {
    return <Observable<Typebook[]>>this.http.get('http://localhost:9999/typebook').pipe();
  }

  getBookByOrder(start, end) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/order/' + start + '/' + end).pipe();
  }

  getBookByOrderView(start, end) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/view/' + start + '/' + end).pipe();
  }

  getBookByOrderType(type, start, end) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/order/' + type + '/' + start + '/' + end).pipe();
  }

  getBookByOrderViewType(type, start, end) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/view/' + type + '/' + start + '/' + end).pipe();
  }

  getBookByID(id_book) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/id/' + id_book).pipe();
  }

  deleteBookByID(id_book) {
    return this.http.delete('http://localhost:9999/book/' + id_book);
  }

  reportNiyay(id_user, id_book, txt) {
    const formData = new FormData();
    formData.append('id_user', id_user);
    formData.append('id_book', id_book);
    formData.append('txt', txt);
    return this.http.post('http://localhost:9999/report/niyay', formData)
  }

  showreport(callback) {
    this.http.get('http://localhost:9999/book/showniyay').subscribe((result) => {
      return callback(result);
    })
  }

  Nobanniyay(id_book, callback) {
    const formData = new FormData();
    formData.append('id_book', id_book);
    this.http.put('http://localhost:9999/book/NoBanniyay', formData).subscribe((result) => {
      return callback(result)
    })
  }

  banniyay(email, description_ban, id_book, callback) {
    const formData = new FormData();
    formData.append('id_book', id_book);
    formData.append('email', email);
    formData.append('description_ban', description_ban);
    this.http.put('http://localhost:9999/book/Banniyay', formData).subscribe((result) => {
      return callback(result)
    })
  }

  bookYear() {
    return this.http.get('http://localhost:9999/book/year').pipe()
  }

  getBookByOrderViewYear(start, end, date) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/view/year/' + start + '/' + end + '/' + date).pipe();
  }

}
