import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-navadmin',
  templateUrl: './navadmin.component.html',
  styleUrls: ['./navadmin.component.css']
})
export class NavadminComponent implements OnInit {

  constructor(public router: Router,private loginService: LoginService) { }

  ngOnInit() {
    if(localStorage.getItem('adminauth') == null){

      this.router.navigate(['/admin/']);
    }
  }
  logout() {
    this.loginService.logoutadmin(result=>{
      if(result){
        this.router.navigate(['/admin/']);
      }
    });
  }
}
