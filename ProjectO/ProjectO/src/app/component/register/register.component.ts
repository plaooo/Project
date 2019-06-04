import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user.model';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  cPass: string;
  file: File;
  imagePreview: string = "../../../assets/img/person.png";

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.router.navigateByUrl('home/page404');
    }
  }

  changeFile = (e) => { //เปลีย่น ไฟล์ ภาพ 
    this.file = e.target.files[0]; //เก้บ file ที่เลือก
    this.user.avatar = e.target.files[0].name // เก้บชื่อไฟล์ ที่เลือก
    const reader = new FileReader();
    reader.onload = () => { //preview รูป ที่เลือก
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.file); //preview รูป ที่เลือก
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onClickService() { // เมื่อกดปุ่ม register
    Swal.fire({
      title: 'ยืนยันการสมัคร',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        console.log(this.user.password);
        if ((this.user.name && this.user.lastname && this.user.panname && this.user.birthday && this.user.password && this.user.email && this.cPass)) {
          if (this.validateEmail(this.user.email)) {
            if (this.validPass(this.user.password)) {
              if (this.cPass == this.user.password) {
                this.registerService.createUser(this.user, this.file).subscribe(data => { // เรียกใช้ service เพื่อ create  ข้อมูล
                  if (data > 0) {
                    Swal.fire({
                      type: 'success',
                      title: 'สมัครสมาชิกสำเร็จ',
                      toast: true,
                      timer: 1500,
                      position: 'top-end',
                      showConfirmButton: false,
                    }).then(() => {
                      this.router.navigateByUrl('home');
                    })
                  } else {
                    Swal.fire({
                      type: 'error',
                      title: 'นามปากกาซ้ำหรืออีเมลซ้ำ',
                    }).then(() => {
                      this.cPass = "";
                    })
                  }
                })
              } else {
                Swal.fire({
                  type: 'error',
                  title: 'password ไม่ตรงกัน',
                }).then(() => {
                  this.cPass = "";
                })
              }
            } else {
              Swal.fire({
                type: 'error',
                title: 'password อย่างน้อย 8 ตัว และต้องมีตัวอักษรหรือตัวเลขอย่างน้อย 1 ตัว',
              }).then(() => {
                this.cPass = "";
              })
            }
          } else {
            Swal.fire({
              type: 'error',
              title: 'รูปแบบ email ไม่ถูกต้อง ตัวอย่าง example@gmail.com',
            }).then(() => {
              this.cPass = "";
            })
          }
        } else {
          Swal.fire({
            type: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
          }).then(() => {
            this.cPass = "";
          })
        }
      }
    })
  }

  validPass(pass) {
    let regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regPass.test(pass);

  }
}
