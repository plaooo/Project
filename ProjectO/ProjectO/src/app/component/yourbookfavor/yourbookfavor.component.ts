import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book/book.medel';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-yourbookfavor',
  templateUrl: './yourbookfavor.component.html',
  styleUrls: ['./yourbookfavor.component.css']
})
export class YourbookfavorComponent implements OnInit {


  books: Array<Book>;
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => {
        this.user = user;
        if (user.id_user != null) {
          this.userService.getFavorBook(this.user.id_user).subscribe(data => {
            this.books = data;
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
    }else {
      this.router.navigateByUrl('home/page404');
    }
  }

  clickChangePage(id_book) {
    this.router.navigate(['home/listepisodeinniyay'], { queryParams: { id_book: id_book } })
  }

}
