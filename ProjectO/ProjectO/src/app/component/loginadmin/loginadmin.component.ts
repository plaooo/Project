import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { JwtService } from '../../service/jwt/jwt.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  constructor(public router: Router,private loginService: LoginService, private jwt: JwtService) { }

  ngOnInit() {   

    if(localStorage.getItem('adminauth') != null){
      this.router.navigate(['/homeadmin']);
    }
  }
  login(v1, v2) {
    this.loginService.loginadmin(v1,v2,(result)=>{
      if(result){
        this.jwt.getDecodedAccessToken(localStorage.getItem('adminauth'), (user) => {
           console.log(user);
           this.router.navigate(['/homeadmin']);
        });
      }else {

      }
    })
    
  }
  // getlogin() {
  //   this.referService.getUsername().subscribe((result: admin[]) => {
  //     this.admin = result;
  //   })
  // }
}
