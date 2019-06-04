import { Component, OnInit } from '@angular/core';
import { WebboardService } from '../../service/webboard/webboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { adminwebboard } from '../../model/admin/admin';
@Component({
  selector: 'app-admincreatewebboard',
  templateUrl: './admincreatewebboard.component.html',
  styleUrls: ['./admincreatewebboard.component.css']
})
export class AdmincreatewebboardComponent implements OnInit {
  adminType: adminwebboard[] = [];
  constructor(private webservice: WebboardService, private router: Router) { }

  ngOnInit() {
    this.Getwebboardadmin();
  }
  CreateWeb(head, collect) {
    let bodys = { idAdmin: 1, headderWebboard: head, collectWebboard: collect };
    this.webservice.Createadminwebboard(bodys, result => {
      Swal.fire(
        'สร้าง webboard สำเร็จ',
        '',
        'success'
      )
      this.router.navigate(['/homeadmin']);
    })
  }

  Getwebboardadmin() {
    this.webservice.Getwebboardadmin(result => {
      this.adminType = result;
    })
  }

  confirm(v1,v2,v3) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการแก้ไข Webboard ใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแก้ไข!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, ยกเลิก!',
      confirmButtonText: 'Yes, แก้ไข!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแก้ไขสำเร็จ',
          'success'
        ).then((result)=>{
          this.webservice.adminmodifywebboard(v1,v2,v3, result => {
            this.Getwebboardadmin();
          })
          // setTimeout(() => {
          //   location.reload();
          // }, 800);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          '',
          'error'
        )
      }
    })
  }

}
