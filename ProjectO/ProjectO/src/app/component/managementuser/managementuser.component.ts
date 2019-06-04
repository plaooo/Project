import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { commentreport, checkwebboard, adminWebboard2 } from '../../model/admin/admin';
import { CommentreportService } from '../../service/commentreport/commentreport.service';

import Swal from 'sweetalert2'
import { WebboardService } from '../../service/webboard/webboard.service';
import { BookService } from 'src/app/service/book/book.service';
import { Book } from 'src/app/model/book/book.medel';


@Component({
  selector: 'app-managementuser',
  templateUrl: './managementuser.component.html',
  styleUrls: ['./managementuser.component.css']
})
export class ManagementuserComponent implements OnInit {
  displayDialog: boolean;
  userReport: commentreport[] = [];
  cwebboard: checkwebboard[] = [];
  admin: adminWebboard2[] = [];
  niyay: Book[] = [];
  constructor(private http: HttpClient, private usercomment: CommentreportService, private webservice: WebboardService, private bookservice: BookService) { }

  ngOnInit() {
    this.commentReport();
    this.Checkwebboardreport();
    this.adminwebboard();
    this.niyayReport();
  }

  niyayReport() {
    this.bookservice.showreport(result => {
      this.niyay = result;
    })
  }

  Deleteniyay(email,id_book) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    Swal.fire({
      title: 'รายงาน',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'รายงาน'
    }).then((result) => {
      if(result.value ==""){
        swalWithBootstrapButtons.fire(
          'กรุณากรอกเหตุผลที่ลบนิยาย',
          '',
          'error'
        )
      }else if (result.value) {
        this.bookservice.banniyay(email,result.value,id_book,(status) => {
          console.log(status);
          if (status == 0) {
            Swal.fire({
              type: 'success',
              title: 'รายงานสำเร็จ',
              toast: true,
              timer: 1500,
              position: 'top-end',
              showConfirmButton: false,
            }).then((result)=>{
              this.niyayReport();
            })
          } else {
            Swal.fire({
              title: 'รายงานไม่สำเร็จ',
              type: 'error'
            })
          }
        })
      }
    })
  }

  NoDeleteniyay(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ไม่ลบนิยายนี้ใช่หรือไม่',
      text: "กด Yes ถ้าต้องการดำเนินการต่อ!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Success!'
    }).then((result) => {

      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          '',
          'success'
        ).then((result) => {
          this.bookservice.Nobanniyay(id,(result)=>{
            this.niyayReport();
          })
        })
      } else if (
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

  adminwebboard() {
    this.webservice.foradminsearchdelete(result => {
      this.admin = result;
    })
  }

  commentReport() {
    this.usercomment.CommentReport((result) => {
      console.log(result);
      
      this.userReport = result;
    })
  }

  confirm1(v1) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ไม่ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการดำเนินการต่อ!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Success!'
    }).then((result) => {

      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          '',
          'success'
        ).then((result) => {
          this.usercomment.CanCelBan(v1, result => {
            this.commentReport();
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

  confirm2(v1, v2) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแบน!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, แบน!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแบนสำเร็จ',
          'success'
        ).then((result) => {
          this.usercomment.Banuser(v1, v2, result => {
            this.commentReport();
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

  Checkwebboardreport() {
    this.webservice.Checkwebboardreport(result => {
      this.cwebboard = result;
      console.log(this.cwebboard);

    })
  }

  confirm3(num) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ไม่ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการดำเนินการต่อ!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Success!'
    }).then((result) => {
      if (result.value) {

        swalWithBootstrapButtons.fire(
          'Success',
          '',
          'success'
        ).then((result) => {
          this.webservice.Webboardcancelban(num, result => {
            this.Checkwebboardreport();
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

  confirm4(num) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแบน!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, แบน!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแบนสำเร็จ',
          'success'
        ).then((result) => {
          this.webservice.Webboardbanuser(num, result => {
            this.Checkwebboardreport();
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

  confirm5(v1) {
    console.log(v1);
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการ ลบโพส นี้ใช่หรือไม่',
      text: "กด Yes หากต้องการลบ!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการลบสำเร็จ',
          'success'
        ).then((result) => {
          this.webservice.admindeletewebboard(v1, result => {
            this.adminwebboard();
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