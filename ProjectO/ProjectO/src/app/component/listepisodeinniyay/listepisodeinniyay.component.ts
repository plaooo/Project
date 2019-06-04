import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book/book.service';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book/book.medel';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listepisodeinniyay',
  templateUrl: './listepisodeinniyay.component.html',
  styleUrls: ['./listepisodeinniyay.component.css']
})
export class ListepisodeinniyayComponent implements OnInit {

  user: User = new User();
  book: Book = new Book();

  indexBookFavor: number;

  repost: string;

  constructor(private bookService: BookService, private episodeService: EpisodeService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {// get user จาก service
      this.user = user;
    })
    this.bookService.getBookByID(this.route.snapshot.queryParamMap.get("id_book")).subscribe(book => { //get book จาก id_book จากเบส
      console.log(book);

      if (book.length == 0) {
        this.router.navigateByUrl('/home/page404')
      } else {
        this.book = book[0];
        if (book[0].img_book) {
          this.book.img_book = 'http://localhost:9999/imagebook/' + book[0].id_book + '/' + book[0].img_book;
        } else {
          this.book.img_book = "../../../assets/img/book.png";
        }
      }
    })

  }

  loadEpisode() {
    this.episodeService.getEpisodeByIDOrder(this.book.id_book, this.book.episode.length).subscribe(episodes => {
      episodes.forEach(episode => {
        this.book.episode.push(episode);
      })
    })
  }

  onClickChangePageEpisode(index) {
    this.episodeService.changeEpisode(this.book.episode[index])
    this.router.navigate(['home/episode'], { queryParams: { id_episode: this.book.episode[index].id_episode } })
  }

  checkBookFavor() {
    let match = false;

    if (this.user.favor.length > 0) {
      for (let i = 0; i < this.user.favor.length; i++) {
        if (this.user.favor[i].id_book == this.book.id_book) {
          match = true;
          this.indexBookFavor = i;
        }

        if (i + 1 == this.user.favor.length) return match;
      }
    } else {
      return match;
    }

  }

  addBookFavor() {
    this.userService.createUserFavorBook(this.user.id_user, this.book.id_book).subscribe(result => {
      if (result > 0) {
        let bookTemp = new Book();
        bookTemp.id_book = this.book.id_book;
        bookTemp.name_fiction = this.book.name_fiction;
        bookTemp.create_day = this.book.create_day;
        bookTemp.preview = this.book.preview;
        bookTemp.img_book = this.book.img_book;
        bookTemp.id_user = this.book.id_user;

        this.user.favor.push(bookTemp);
      }
    })
  }

  deleteFavor() {
    this.userService.deleteUserFavorBook(this.user.id_user, this.book.id_book).subscribe(result => {
      if (result > 0) {
        this.user.favor.splice(this.indexBookFavor, 1)
      }
    })
  }

  checkUserLogin() {
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      if (typeof (user.id_user) != 'undefined') {
        return true;
      } else {
        return false;
      }

    })
  }

  openReport() {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })
    Swal.fire({
      title: 'รายงาน',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'รายงาน'
    }).then((result) => {
      console.log(result.value);

      if (result.value == "") {
        swalWithBootstrapButtons.fire(
          'กรุณากรอกเหตุผลที่ต้องการรายงาน',
          '',
          'error'
        )
      } else if (result.value) {
        this.bookService.reportNiyay(this.user.id_user, this.book.id_book, result.value).subscribe((status) => {
          if (status > 0) {
            Swal.fire({
              type: 'success',
              title: 'รายงานสำเร็จ',
              toast: true,
              timer: 1500,
              position: 'top-end',
              showConfirmButton: false,
            })
          } else {
            Swal.fire({
              title: 'รายงานไม่สำเร็จ',
              type: 'error'
            })
          }
        })
      }
    })
  }

}
