import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { Episode, comment } from 'src/app/model/episode/episode.model';
import { CommentreportService } from '../../service/commentreport/commentreport.service';
import { UserService } from '../../service/user/user.service';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/service/jwt/jwt.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  nameuser: string = "";
  lcomment: comment[] = [];
  id_user: number;
  episode: Episode = new Episode();
  checklogin: boolean = false;
  texts: String[] = [];
  comment2: number[] = [];
  imgProfile: string = '';
  imgProfile3: Array<string> = new Array();
  collect="";
  constructor(private route: ActivatedRoute, private jwt: JwtService, private episodeService: EpisodeService, 
    private commentservice: CommentreportService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { //เช้คว่ามีการล้อคอินหรือไม่
      this.checklogin = true;
      this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user, i) => {
        console.log(user);

        if (user) {
          this.nameuser = user.panname;
          if (user.avatar != null) {
            this.imgProfile = "http://localhost:9999/img/" + user.id_user + "/" + user.avatar;
          } else {
            this.imgProfile = "../../../assets/img/person.png";
          }
        }
      })
    }
    this.userService.userCurrent.subscribe(result => { // get ค่า user

      if (result.id_user && result.status == 0) {
        this.id_user = result.id_user;
        if (result.avatar != null) {
          this.imgProfile = "http://localhost:9999/img/" + result.id_user + "/" + result.avatar;
        } else {
          this.imgProfile = "../../../assets/img/person.png";
        }
        this.checklogin = true;
      } else if (result.id_user && result.status == 1) {
        this.checklogin = false;
      } else {
        this.checklogin = false;
      }

    })
    this.episodeService.getEpisodeByIDEpisode(this.route.snapshot.queryParamMap.get('id_episode')).subscribe(episode => { //get episode จาก เบส
      console.log(episode);
      if (episode.id_episode == 0) {
        this.router.navigateByUrl('/home/page404')
      }
      this.episode = episode;
      this.episode.view = this.episode.view + 1;
      this.viewPlus();
      this.listcomment();
    })

  }

  viewPlus() {
    this.episodeService.updateEpisodeView(this.episode).subscribe(() => {

    })
  }

  Comment() {

    this.userService.getstatusUser(this.id_user).subscribe((results) => {
      if (results == 0) {
        this.commentservice.insertcomment(this.collect, result => {
          if (result) {
            this.commentservice.insertusercomment(this.id_user, result, this.episode.id_book, this.episode.id_episode, end => {
              Swal.fire(
                'Commentนิยายแล้ว',
                '',
                'success'
              ).then(r => {
                this.collect = "";
                this.listcomment();
              })
            })
          }
        })
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถ Comment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
          this.listcomment();
        })
      }
    })
  }

  listcomment() {
    this.commentservice.listcomment(this.episode.id_book, this.episode.id_episode, result => {
      console.log(result);
      
      this.lcomment = result;
      for (let i = 0; i < this.lcomment.length; i++) {
        if (this.lcomment[i].avatar != null) {
          this.imgProfile3[i] = "http://localhost:9999/img/" + this.lcomment[i].idUser + "/" + this.lcomment[i].avatar;
        } else {
          this.imgProfile3[i] = "../../../assets/img/person.png";
        }
        this.comment2[i] = this.lcomment[i].idComment;
        this.texts[i] = this.lcomment[i].collectComment;
      }
    })
  }

  modifycomment(v1, v2) {
    this.userService.getstatusUser(this.id_user).subscribe((results) => {
      console.log(results);

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
              this.commentservice.modifyusercomment(v1, v2, result => {
                this.listcomment();
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

      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถแก้ไข Comment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
          this.listcomment();
        })
      }
    })

  }

  deletecomment(v1, v2) {
    this.userService.getstatusUser(this.id_user).subscribe((results) => {
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
              this.commentservice.deleteusercomment(v1, v2, result => {
                this.listcomment();
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
          'ไอดีของคุณระงับ ไม่สามารถลบComment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
          this.listcomment();
        })
      }
    })
  }

  report(v1, v2) {
    this.userService.getstatusUser(this.id_user).subscribe((results) => {
      if (results == 0) {
        this.userService.getstatusUser(v1).subscribe((result2) => {
          if(result2 == 1){
            Swal.fire(
              'Commentถูกระงับเรียบร้อยแล้ว',
              '',
              'success'
            ).then(e=>{
              this.listcomment(); 
            })
          }else{
            this.commentservice.reportusercomment(v1, v2, result => {
              Swal.fire(
                'รายงานCommentนี้สำเร็จ',
                '',
                'success'
              )
            })
          }
        })
      } else {
        Swal.fire(
          'ไอดีของคุณระงับ ไม่สามารถรายงานComment',
          '',
          'error'
        ).then(r => {
          this.checklogin = false;
          this.listcomment();
        })
      }
    })

  }
}