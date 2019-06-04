import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  imgProfile: string;

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => {
        this.user = user;
        if (user.avatar != null) {
          this.imgProfile = "http://localhost:9999/img/" + user.id_user + "/" + user.avatar;
        } else {
          this.imgProfile = "../../../assets/img/person.png";
        }
      })
    } else {
      this.router.navigateByUrl('home/page404');
    }
  }

  onClickChangePage(page: string) {
    this.router.navigateByUrl('home/profile/' + page);
  }

}
