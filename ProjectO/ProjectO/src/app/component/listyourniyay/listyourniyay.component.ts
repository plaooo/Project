import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book/book.service';
import { Book } from 'src/app/model/book/book.medel';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listyourniyay',
  templateUrl: './listyourniyay.component.html',
  styleUrls: ['./listyourniyay.component.css']
})
export class ListyourniyayComponent implements OnInit {

  books: Array<Book>;
  user: User;

  constructor(private bookService: BookService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => {
        this.user = user;
        if (user.id_user != null) {
          this.bookService.getBookByUser(this.user.id_user).subscribe(data => {
            this.books = data;
            this.user.books = data;
            data.forEach((book, i) => {
              if (book.img_book) {
                this.books[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
              } else {
                this.books[i].img_book = "../../../assets/img/book.png";
              }
            })
          })

        }
      })
    } else {
      this.router.navigateByUrl('home/page404');
    }
  }

  clickChangePage(id) {
    this.router.navigate(['home/profile/episodelist'], { queryParams: { id_book: id } });
  }

  deleteBookByID(id, i) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        this.bookService.deleteBookByID(id).subscribe(result => {
          if (result > 0) {
            this.books.splice(i, 1);
            this.user.books = this.books;
            Swal.fire({
              title: 'ลบสำเร็จ',
              type: 'success',
              toast: true,
              timer: 1500,
              position: 'top-right',
              showConfirmButton: false
            })
          } else {
            Swal.fire({
              title: 'ลบไม่สำเร็จ',
              type: 'error',
              toast: true,
              timer: 1500,
              position: 'top-right',
              showConfirmButton: false
            })
          }
        })
      }
    })
  }
}
