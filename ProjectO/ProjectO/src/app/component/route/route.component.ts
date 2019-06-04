import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {

  }

  getUser(user) { // setค่า user ที่ได้จาก nav ไว้กับ service
    if (typeof (user.id_user) != 'undefined') {
      this.userService.getFavorBook(user.id_user).subscribe(book_favor => { // get หนังสือที่ติดตามไว่
        user.favor = book_favor;
        this.userService.changeUser(user); 
      })
    } else {
      this.userService.changeUser(user);
    }
  }

}
