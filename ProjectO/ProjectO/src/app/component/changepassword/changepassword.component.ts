import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EmailService } from '../../service/email/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute, private emailservice: EmailService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(event => event.id)
    ).subscribe((event) => {
      this.id = event.id
    });
  }


  submit(v1, v2) {

    if (v1 == "" || v2 == "") {
      Swal.fire(
        'กรุณากรอกพาสเวิด',
        '',
        'warning'
      )
    } else if (v1 != v2) {
      Swal.fire(
        'กรุณากรอกพาสเวิดให้ตรงกันทั้ง 2 ช่อง',
        '',
        'warning'
      )
    } else {
      this.emailservice.changeemail(v1, this.id, result => {
        Swal.fire(
          'ทำการเปลี่ยนรหัสผ่านสำเร็จ',
          '',
          'success'
        ).then(result=>{
          this.router.navigate(['/home']);
        })
      })
    }
  }
}