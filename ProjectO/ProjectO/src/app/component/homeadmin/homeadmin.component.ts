import { Component, OnInit } from '@angular/core';
import { TotallikeService } from '../../service/totallike/totallike.service';
import { likeday, likemonth, likeyear, commentday, commentmonth, commentyear, viewday, viewmonth, viewyear } from '../../model/admin/admin';
import { TotalcommentService } from '../../service/totalcomment/totalcomment.service';
import { TotalviewService } from '../../service/totalview/totalview.service';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css']
})
export class HomeadminComponent implements OnInit {
  likeday: likeday[] = [];
  likemonth: likemonth[] = [];
  likeyear: likeyear[] = [];
  blikeday: boolean = true;
  blikemonth: boolean = true;
  blikeyear: boolean = true;

  commentday: commentday[] = [];
  commentmonth: commentmonth[] = [];
  commentyear: commentyear[] = [];
  bcommentday: boolean = true;
  bcommentmonth: boolean = true;
  bcommentyear: boolean = true;

  viewday: viewday[] = [];
  viewmonth: viewmonth[] = [];
  viewyear: viewyear[] = [];
  bviewday: boolean = true;
  bviewmonth: boolean = true;
  bviewyear: boolean = true;

  constructor(public totallike: TotallikeService, public totalcomment: TotalcommentService, public totalview: TotalviewService) { }

  ngOnInit() {
    this.LikeDay();
    this.LikeMonth();
    this.LikeYear();

    this.ViewDay();
    this.ViewMonth();
    this.ViewYear();

    this.CommentDay();
    this.CommentMonth();
    this.CommmentYear();
  }

  LikeDay() {
    this.totallike.TopLikeDay((result) => {
      if (result == "") {
        this.blikeday = false;
      }
      this.likeday = result;
    })
  }

  LikeMonth() {
    this.totallike.TopLikeMonth((result) => {
      if (result == "") {
        this.blikemonth = false;
      }
      this.likemonth = result;
    })
  }

  LikeYear() {
    this.totallike.TopLikeYear((result) => {
      if (result == "") {
        this.blikeyear = false;
      }
      this.likeyear = result;
    })
  }

  CommentDay() {
    this.totalcomment.CommentDay((result) => {
      if (result == "") {
        this.bcommentday = false;
      }
      this.commentday = result;
    })
  }

  CommentMonth() {
    this.totalcomment.CommentMonth((result) => {
      if (result == "") {
        this.bcommentmonth = false;
      }
      this.commentmonth = result;
    })
  }

  CommmentYear() {
    this.totalcomment.CommentYear((result) => {
      if (result == "") {
        this.bcommentyear = false;
      }
      this.commentyear = result;
    })
  }

  ViewDay() {
    this.totalview.ViewDay((result) => {
      if (result == "") {
        this.bviewday = false;
      }
      this.viewday = result;
    })
  }

  ViewMonth() {
    this.totalview.ViewMonth((result) => {
      if (result == "") {
        this.bviewmonth = false;
      }
      this.viewmonth = result;
    })
  }

  ViewYear() {
    this.totalview.ViewYear((result) => {
      if (result == "") {
        this.bviewyear = false;
      }
      console.log(result);  
      this.viewyear = result;
    })
  }

}
