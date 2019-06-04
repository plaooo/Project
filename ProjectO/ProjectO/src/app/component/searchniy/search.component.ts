import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search/search.service';
import { searchall } from '../../model/admin/admin';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book/book.service';
import { Typebook } from 'src/app/model/typebook/typebook';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchniyComponent implements OnInit {
  searchall: searchall[] = [];
  imgbook: string[] =[];
  searchText = "";
  p="";
  constructor(private searchservice: SearchService,private router: Router,private bookService: BookService) { }

  ngOnInit() {
    this.SearchAll();
  }

  SearchAll() {
    console.log('25');
    
    this.searchservice.SearchAll(result => {
      
      this.searchall = result;
      console.log(this.searchall);
      
    })
  }

  onClickService(book){
    console.log(book);
    this.router.navigate(['home/listepisodeinniyay'], { queryParams: { id_book: book } })

  }
}