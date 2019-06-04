import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/model/user/user.model';
import { JwtService } from 'src/app/service/jwt/jwt.service';
import { EmailService } from '../../service/email/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  closeResult: string;
  isCollapsed = true;
  user: User = new User();
  status_login: boolean = false;


  @Output() getuser = new EventEmitter<User>();

  constructor(private modalService: NgbModal, private router: Router, private loginService: LoginService, private jwt: JwtService, private emailservice: EmailService) { }

  open(content) { // เปิด modal การล้อคอิน
    this.modalService.open(content);
  }

  changePageRegister() { // เปลี่ยนหน้าไปยังหน้า register
    this.router.navigateByUrl('/home/register');
    this.modalService.dismissAll()
  }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.status_login = true; ///เปลี่ยนปุ่มการแสดงผล
      this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user) => { /// get ค่า user ที่เข้ารหัสไว้ ออกมาจาก localstorage
        if (user) {
          this.user = user;  //set ค่า ให้กับ user
          this.sendUserNav(); // ส่งค่า user ไปทุกหน้า
        }
      });
    }
  }

  login() {  //เรียกใช้ service login เพื่อเช้คค่า email และ password
    this.loginService.login(this.user, (dataAuth) => {
      if (dataAuth) {  // email และ pass ถูกต้อง
        this.status_login = dataAuth; // เปลี่ยนปุ่มแสดงผล
        this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user) => { /// get ค่า user ที่เข้ารหัสไว้ ออกมาจาก localstorage
          if (user) {
            console.log(this.router.url);

            this.user = user; //set ค่า ให้กับ user
            this.sendUserNav(); // ส่งค่า user ไปทุกหน้า
            this.modalService.dismissAll(); //ทำลาย model
            let url = this.router.url.split('/'); // ตัดสตริงตาม /
            let checkURL = url.find(this.findPathRegister) // เช้คสตริงที่ได้จากการตัด ว่าตรงกับ register ไหม
            if (checkURL != null) { //ถ้าตรง
              this.router.navigateByUrl('/home')// ไปหน้า page 404
            }
          }
        });
      } else { // ถ้า email หรือ password ผิด
        Swal.fire({ // แสดง sweet alert 
          type: 'error',
          title: 'email หรือ password ผิด',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then(() => {
          this.status_login = dataAuth;
        })
      }
    });
  }

  logout() {
    this.loginService.logout(); //เรียกใช้เซอวิสlogout เพื่อทำลาย auth ใน localstorage
    this.status_login = false; //เปลี่ยนการแสดงผลปุ่ม
    this.user = new User(); //set user เป็น null
    this.sendUserNav(); // ส่งค่า user ไปยังหน้าอื่นๆ
    this.checkLogout(); // ทุกครั้งที่ ล้อคเอ้า จะเช้ค พาท ว่ายุในหน้า profile ไหม ถ้าอยู่ ให้ render page404 
  }

  onClickChangePage(path: string) {
    this.router.navigateByUrl("/home/" + path); // เปลี่ยนหน้าไปยัง page ต่างๆ
  }

  sendUserNav() {
    this.getuser.emit(this.user); // ส่งค่า user ไปยังหน้าอื่นๆ โดยส่งกลับไปที่หน้า route แล้ว set ค่าไว้ที่ service
  }

  forgotpass() {
    if (this.user.email == undefined) {
      Swal.fire(
        'กรุณากรอกอีเมลล์ของท่าน',
        '',
        'warning'
      )
    } else {
      this.emailservice.forgetpassword(this.user.email, result => {
        Swal.fire(
          'ส่ง อีเมลล์ สำเร็จ',
          'กรุณาเช็คที่อีเมลล์ของท่านเพื่อเปลี่ยนรหัสผ่าน',
          'success'
        ).then(result => {
          this.modalService.dismissAll();
        })
      })
    }
  }

  checkLogout() {
    let url = this.router.url.split('/'); // ตัดสตริงตาม /
    let checkURL = url.find(this.findPath) // เช้คสตริงที่ได้จากการตัด ว่าตรงกับ profile ไหม
    if (checkURL != null) { //ถ้าตรง
      this.router.navigateByUrl('/home')// ไปหน้า page 404
    }
  }

  findPath(path) {
    return path == 'profile' || path == 'editprofile';
  }

  findPathRegister(path) {
    return path == 'register';
  }
}