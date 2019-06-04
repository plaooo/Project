import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WebboardService } from '../../service/webboard/webboard.service';
import { main, comment } from '../../model/admin/admin';
import Swal from 'sweetalert2';
import { JwtService } from '../../service/jwt/jwt.service';
import { User } from '../../model/user/user.model';
import { CommentreportService } from 'src/app/service/commentreport/commentreport.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-descriptionwebboard',
  templateUrl: './descriptionwebboard.component.html',
  styleUrls: ['./descriptionwebboard.component.css']
})
export class DescriptionwebboardComponent implements OnInit {
  nameuser: string = "";
  main: main[] = [];
  comment: comment[] = [];
  id: number;
  texts: string[] = [];
  collecttext = "";
  text = ""
  p = "";
  user: User = new User();
  gg: number = 0;
  checklogin: boolean = false;
  cCommentModifyDelelt: boolean = false;
  testcommentcheck: boolean = false;
  imgProfile: string = '';
  imgProfile2: string = '';
  imgProfile3: Array<string> = new Array();
  collect2="";
  constructor(private route: ActivatedRoute, private webservice: WebboardService, private jwt: JwtService, private router: Router, private commentservice: CommentreportService, private userService: UserService) {
  }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) {

      this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user, i) => {


        if (user) {
          this.nameuser = user.panname;
          this.checklogin = true;
          this.user = user;
          this.gg = user.id_user;
          if (user.avatar != null) {
            this.imgProfile = "http://localhost:9999/img/" + user.id_user + "/" + user.avatar;
          } else {
            this.imgProfile = "../../../assets/img/person.png";
          }
        }
      })
    }

    this.userService.userCurrent.subscribe((userT) => {
      console.log(userT.id_user);

      if (userT.id_user) {
        this.nameuser = userT.panname;
        this.checklogin = true;
        this.user = userT;
        this.gg = userT.id_user;
        if (userT.avatar != null) {
          this.imgProfile = "http://localhost:9999/img/" + userT.id_user + "/" + userT.avatar;
        } else {
          this.imgProfile = "../../../assets/img/person.png";
        }
      } else {
        this.checklogin = false;
      }
    })

    this.route.queryParams.pipe(
      filter(event => event.id)
    ).subscribe((event) => {
      this.id = event.id
      this.GetTopic(this.id);
      this.GetComment(this.id);
    });

  }

  GetComment(num) {
    let body = { idWebboard: num };
    this.webservice.Commentwebboard(body, result => {
      this.comment = result;


      result.forEach((rs, i) => {

        if (rs.avatar != null) {
          this.imgProfile3[i] = "http://localhost:9999/img/" + rs.idUser + "/" + rs.avatar;
        } else {
          this.imgProfile3[i] = "../../../assets/img/person.png";
        }
      })

      for (let i = 0; i < this.comment.length; i++) {
        this.texts[i] = this.comment[i].collectWebboard;
      }
    })
  }
  GetTopic(num) {
    let body = { idWebboard: num };
    this.webservice.Typewebboard(body, result => {
       if (result[0].avatar != null) {
        this.imgProfile2 = "http://localhost:9999/img/" + result[0].idUser + "/" + result[0].avatar;
      } else {
        this.imgProfile2 = "../../../assets/img/person.png";
      }

      this.main = result;
      
      
      this.text = this.main[0].headderWebboard;
      this.collecttext = this.main[0].collectWebboard;
      if (this.gg == this.main[0].idUser) {
        this.cCommentModifyDelelt = true;
      }
    })
  }

  Comment() {
    this.userService.getstatusUser(this.gg).subscribe((results) => {
      if (results == 0) {
        let body = { idUser: this.gg, idWebboard: this.id, collectUserWebboard: this.collect2 };
        this.webservice.Createcommentwebboard(body, result => {
          Swal.fire(
            'สร้าง comment สำเร็จ',
            '',
            'success'
          ).then(result => {
            this.collect2 = "";
            this.GetComment(this.id);
          })

        })
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถComment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
          this.GetComment(this.id);
        })
      }
    })
  }

  reportCom(v1) {
    this.userService.getstatusUser(this.gg).subscribe((results) => {
      if (results == 0) {
        this.webservice.reportCommentWebboard(v1, result => {
          Swal.fire(
            'รายงานCommentWebboardนี้สำเร็จ',
            '',
            'success'
          )
        })
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถรายงานComment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
        })
      }
    })
  }

  report(v1) {
    this.webservice.setStatus1(v1, result => {
      Swal.fire(
        'รายงานWebboardนี้สำเร็จ',
        '',
        'success'
      )

    })
  }

  modify(head, collect, v3) {
    this.userService.getstatusUser(this.gg).subscribe((results) => {
      if (results == 0) {
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
            ).then((result) => {
              this.webservice.usermodifywebboard(v3, head, collect, result => {
                this.GetTopic(this.id);
              })
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
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถแก้ไช Webboard',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
        })
      }
    })
  }

  deleteweb(v1) {
    this.userService.getstatusUser(this.gg).subscribe((results) => {
      if (results == 0) {
        const swalWithBootstrapButtons = Swal.mixin({
          cancelButtonClass: 'btn btn-danger',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false,
        })

        swalWithBootstrapButtons.fire({
          title: 'ต้องการลบ Webboard ใช่หรือไม่',
          text: "กด Yes ถ้าต้องการลบ!",
          type: 'question',
          showCancelButton: true,
          cancelButtonText: 'No, ยกเลิก!',
          confirmButtonText: 'Yes, ลบ!'
        }).then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              'Success',
              'ทำการลบไขสำเร็จ',
              'success'
            ).then((result) => {
              this.webservice.admindeletewebboard(v1, result => {
                this.router.navigate(['/home/webboard']);
              })
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
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถลบ Webboard',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
        })
      }
    })
  }

  modifycomment(v1, v2) {
    this.userService.getstatusUser(this.gg).subscribe((results) => {
      if (results == 0) {
        const swalWithBootstrapButtons = Swal.mixin({
          cancelButtonClass: 'btn btn-danger',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false,
        })

        swalWithBootstrapButtons.fire({
          title: 'ต้องการแก้ไข Comment ใช่หรือไม่',
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
            ).then((result) => {
              this.webservice.usermodifycomment(v1, v2, result => {
                this.GetComment(this.id);
              })

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
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถแก้ไข Comment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
        })
      }
    })
  }

  deletecomment(v1) {
    this.userService.getstatusUser(this.gg).subscribe((results) => {
      if (results == 0) {
        const swalWithBootstrapButtons = Swal.mixin({
          cancelButtonClass: 'btn btn-danger',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false,
        })

        swalWithBootstrapButtons.fire({
          title: 'ต้องการลบ Webboard ใช่หรือไม่',
          text: "กด Yes ถ้าต้องการลบ!",
          type: 'question',
          showCancelButton: true,
          cancelButtonText: 'No, ยกเลิก!',
          confirmButtonText: 'Yes, ลบ!'
        }).then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              'Success',
              'ทำการลบไขสำเร็จ',
              'success'
            ).then((result) => {
              this.webservice.userdeletecomment(v1, result => {
                this.GetComment(this.id);
              })
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

      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถลบ Comment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
        })
      }
    })
  }
}