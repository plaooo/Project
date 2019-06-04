import { Component, OnInit } from '@angular/core';
import { webboard1, webboard2, webboard3, adminwebboard } from '../../model/admin/admin';
import { WebboardService } from '../../service/webboard/webboard.service';
import { Router } from '@angular/router';
import { WebboardallComponent } from '../webboardall/webboardall.component';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';


@Component({
  selector: 'app-webboard',
  templateUrl: './webboard.component.html',
  styleUrls: ['./webboard.component.css']
})
export class WebboardComponent implements OnInit {
  type1: webboard1[] = [];
  type2: webboard2[] = [];
  type3: webboard3[] = [];
  adminType: adminwebboard[] = [];

  user: User = new User()
  constructor(public webboardservice: WebboardService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      console.log(user);
      
      this.GetTypeOne();
      this.GetTypeTwo();
      this.GetTypeThree();
      this.Getwebboardadminl3();
    })
  }

  GetTypeOne() {
    this.webboardservice.GetTypeOne(result => {
      console.log(result);

      this.type1 = result;
    })
  }

  GetTypeTwo() {

    this.webboardservice.GetTypeTwo(result => {
      console.log(result);

      this.type2 = result;
    })
  }

  GetTypeThree() {
    this.webboardservice.GetTypeThree(result => {
      console.log(result);

      this.type3 = result;
    })
  }

  GoAllType1() {
    this.router.navigate(['/home/webboardalltype1']);
  }

  GoAllType2() {
    this.router.navigate(['/home/webboardalltype2']);
  }

  GoAllType3() {
    this.router.navigate(['/home/webboardalltype3']);
  }

  create() {
    this.router.navigate(['/home/createwebboard']);
  }

  descript(number) {
    this.router.navigate(['/home/descriptionwebboard'], { queryParams: { id: number } });
  }

  Getwebboardadminl3() {
    this.webboardservice.Getwebboardadminl3(result => {

      this.adminType = result;
    })
  }

  GoAdminType() {
    this.router.navigate(['/home/admintypewebboard']);
  }

  descriptadmin(number) {
    this.router.navigate(['/home/admindescriptionwebboard'], { queryParams: { id: number } });
  }
}
