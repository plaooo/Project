import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt/jwt.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  user: User;

  name: string
  lastname: string
  birthday: Date
  panname: string

  file: File;
  imagePreview: string;

  constructor(private userService: UserService, private router: Router, private jwtService: JwtService) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => { // get ค่า user จาก service
        this.user = user;
        this.name = user.name
        this.lastname = user.lastname
        this.birthday = user.birthday
        this.panname = user.panname
        if (user.avatar != null) {
          this.imagePreview = "http://localhost:9999/img/" + user.id_user + "/" + user.avatar; // set path รูป
        } else {
          this.imagePreview = "../../../assets/img/person.png";  // set path รูป
        }
      })
      // this.jwtService.getDecodedAccessToken(localStorage.getItem('auth'), (user) => {
      //   console.log(user);

      // })
    } else {
      this.router.navigateByUrl('home/page404');
    }
  }

  changeFile = (e) => {
    console.log(e.target.files[0]);
    this.file = e.target.files[0];
    this.user.avatar = e.target.files[0].name
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.file);
  }

  onClickService() { // เรียก service แก้ไข ข้อมูล
    Swal.fire({
      title: 'ยืนยันการแก้ไข',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        let user = new User()
        user.id_user = this.user.id_user
        user.avatar = this.user.avatar
        user.name = this.name
        user.panname = this.panname
        user.birthday = this.birthday
        user.lastname = this.lastname
        this.userService.updateUser(user, this.file).subscribe(data => {
          if (data['auth'] != null) {
            localStorage.setItem('auth', data['auth'])
            Swal.fire({
              type: 'success',
              title: 'แก้ไขสำเร็จ',
              toast: true,
              timer: 1500,
              position: 'top-end',
              showConfirmButton: false,
            }).then(() => {
              this.user.name = this.name;
              this.user.panname = this.panname;
              this.user.birthday = this.birthday;
              this.user.lastname = this.lastname;
              this.user.avatar = this.user.avatar;
              Swal.fire({
                title: 'กลับหน้า HOME',
                type: 'question',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/home')
                }else{
                  this.router.navigateByUrl('/home')
                  
                }
              })
            })

          } else {
            Swal.fire({
              type: 'error',
              title: 'นามปากกาซ้ำหรือฐานข้อมูลมีปัญหา',
            })
          }
        })
      }
    })
  }

}
