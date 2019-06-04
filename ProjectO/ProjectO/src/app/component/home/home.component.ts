import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { BookService } from 'src/app/service/book/book.service';
import { Book } from 'src/app/model/book/book.medel';
import { Typebook } from 'src/app/model/typebook/typebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  guidebooks: Array<Book>;
  typebooks: Array<Typebook>;

  books_newfilter: Array<Book>;
  books_viewfilter: Array<Book>;

  defaultImg = "../../../assets/img/book.png";

  // @Input('getuser') getuser: User

  constructor(private userService: UserService, private bookService: BookService, private router: Router) {

  }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => { //get user จาก service
      console.log(user);
    })
    this.bookService.getBookByOrder(0, 5).subscribe(books => { //get หนังสือใหม่จากเบส
      this.books_newfilter = books;
      console.log(this.books_newfilter);
      
      books.forEach((book, i) => {
        if (book.img_book) {
          this.books_newfilter[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book; /// set path รูป
        } else {
          this.books_newfilter[i].img_book = "../../../assets/img/book.png";/// set path รูป
        }
      })
    })
    this.bookService.getTypeBook().subscribe(type => { // get type หนังสือ
      this.typebooks = type
    })
    this.bookService.getBookByOrderView(0, 5).subscribe(books => { //get หนัง วิวเยอะจากเบส
      this.books_viewfilter = books;
      console.log(this.books_viewfilter);
      
      books.forEach((book, i) => {
        if (book.img_book) {
          this.books_viewfilter[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book; /// set path รูป
        } else {
          this.books_viewfilter[i].img_book = "../../../assets/img/book.png"; /// set path รูป
        }
      })
    })
    this.bookService.getBookByOrderView(0, 10).subscribe(books => { //get หนัง วิวเยอะจากเบส
      this.guidebooks = books;
      books.forEach((book, i) => {
        if (book.img_book) {
          this.guidebooks[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book; /// set path รูป
        } else {
          this.guidebooks[i].img_book = "../../../assets/img/book.png"; /// set path รูป
        }
      })
    })
  }

  onClickService(book: Book) {
    this.router.navigate(['home/listepisodeinniyay'], { queryParams: { id_book: book.id_book } }) // เปลี่ยนไปหน้าอ่านนิยาย
  }

  onChangeType($event) { //เมื่อเปลี่ยน type ของหนังสือใหม่ จะกรองเอาแต่ละ type มาอย่างละ 5
    if ($event.target.value == 0) {
      this.bookService.getBookByOrder(0, 5).subscribe(books => {
        this.books_newfilter = books;
        books.forEach((book, i) => {
          if (book.img_book) {
            this.books_newfilter[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          } else {
            this.books_newfilter[i].img_book = "../../../assets/img/book.png";
          }
        })
      })
    } else {
      this.bookService.getBookByOrderType($event.target.value, 0, 5).subscribe(books => {
        this.books_newfilter = books;
        books.forEach((book, i) => {
          if (book.img_book) {
            this.books_newfilter[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          } else {
            this.books_newfilter[i].img_book = "../../../assets/img/book.png";
          }
        })
      })
    }
  }

  onChangeTypeView($event) { //เมื่อเปลี่ยน type ของหนังสือวิวเยอะ จะกรองเอาแต่ละ type มาอย่างละ 5
    if ($event.target.value == 0) {
      this.bookService.getBookByOrderView(0, 5).subscribe(books => {
        this.books_viewfilter = books;
        books.forEach((book, i) => {
          if (book.img_book) {
            this.books_viewfilter[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          } else {
            this.books_viewfilter[i].img_book = "../../../assets/img/book.png";
          }
        })
      })
    } else {
      this.bookService.getBookByOrderViewType($event.target.value, 0, 5).subscribe(books => {
        this.books_viewfilter = books;
        books.forEach((book, i) => {
          if (book.img_book) {
            this.books_viewfilter[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          } else {
            this.books_viewfilter[i].img_book = "../../../assets/img/book.png";
          }
        })
      })
    }
  }

}
