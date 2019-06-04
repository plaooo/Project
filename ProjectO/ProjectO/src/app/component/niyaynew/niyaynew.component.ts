import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book/book.medel';
import { BookService } from 'src/app/service/book/book.service';
import { Typebook } from 'src/app/model/typebook/typebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-niyaynew',
  templateUrl: './niyaynew.component.html',
  styleUrls: ['./niyaynew.component.css']
})
export class NiyaynewComponent implements OnInit {

  books_new: Array<Book>
  books_new_filter: Array<Book>
  typebooks: Array<Typebook>
  searchtxt: string = '';
  searchtype: number = 0;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.bookService.getBookByOrder(0, 100).subscribe(books => {
      this.books_new = books;
      this.books_new_filter = books;
      books.forEach((book, i) => {
        if (book.img_book) {
          this.books_new[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          this.books_new_filter[i].img_book = book.img_book;
        } else {
          this.books_new[i].img_book = "../../../assets/img/book.png";
          this.books_new_filter[i].img_book = "../../../assets/img/book.png";
        }
      })
    })

    this.bookService.getTypeBook().subscribe(type => {
      this.typebooks = type
    })
  }

  searchBook() {

    let booksSearch = this.books_new_filter.filter(book => {
      let isMacth = false;
      book.typebook.forEach(typebook => {
        if (typebook.id_type == this.searchtype || this.searchtype == 0) isMacth = true;
      })
      return isMacth;
    })

    if(this.searchtxt.length > 0){
      this.books_new = booksSearch.filter(book => {
        return book.name_fiction.includes(this.searchtxt)
      })
    }else{
      this.books_new = booksSearch;
    }
  }

  onClickService(book: Book) {
    console.log(book);
    this.router.navigate(['home/listepisodeinniyay'], { queryParams: { id_book: book.id_book } })

  }

}
