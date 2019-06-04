import { Component, OnInit } from '@angular/core';
import { WebboardService } from '../../service/webboard/webboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user/user.service';
@Component({
  selector: 'app-createwebboard',
  templateUrl: './createwebboard.component.html',
  styleUrls: ['./createwebboard.component.css']
})
export class CreatewebboardComponent implements OnInit {
  type: number = 0;
  idUser: number = 0;
  constructor(private webservice: WebboardService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      this.idUser = user.id_user;
    })
  }

  CreateWeb(head, collect) {
    if (this.idUser == 0) {
      Swal.fire(
        'ไม่ได้ทำการล็อคอินไม่สามารถสร้าง Webboard ได้',
        '',
        'error'
      )
    } else {
      let bodys = { idUser: this.idUser, typeWebboard: this.type, headderWebboard: head, collectWebboard: collect };
      this.webservice.CreateWeb(bodys, result => {
        Swal.fire(
          'สร้าง webboard สำเร็จ',
          '',
          'success'
        )
        this.router.navigate(['/home/webboard']);
      })
    }
  }

}