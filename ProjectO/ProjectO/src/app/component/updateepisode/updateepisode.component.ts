import { Component, OnInit } from '@angular/core';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateepisode',
  templateUrl: './updateepisode.component.html',
  styleUrls: ['./updateepisode.component.css']
})
export class UpdateepisodeComponent implements OnInit {

  episode: Episode = new Episode()
  user: User;
  show: number = 0;

  public options: Object = {
    charCounterCount: true,
    placeholderText: 'Edit Your Content Here!',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontFamily', 'fontSize', 'color',],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontFamily', 'fontSize', 'color',],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontFamily', 'fontSize', 'color',],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontFamily', 'fontSize', 'color',],
    quickInsertTags: [],

    // Set request type.
    imageUploadMethod: 'POST',

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events: {
      'froalaEditor.image.beforeUpload': function (e, editor, images) {
        //Your code 
        if (images.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = (ev) => {
            const result = ev.target['result'];
            editor.image.insert(result, null, null, editor.image.get());
            console.log(ev, editor.image, ev.target['result'])
          };
          // Read image as base64.
          reader.readAsDataURL(images[0]);
        }
        // Stop default upload chain.
        return false;
      }
    }
  }
  constructor(private episodeService: EpisodeService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => { // get ค่า user จาก service
        this.user = user;
        if (user.books != null) {
          this.episodeService.getEpisodeByIDEpisode(this.route.snapshot.paramMap.get('id')).subscribe(episode => { //get รายละเอียด ของepisode
            this.episode = episode;
          })
        } else {
          this.show = 1;
        }
      })
    } else {
      this.router.navigateByUrl('home/page404');
    }


  }

  updataEpisode() {

    if (this.episode.content == '' || this.episode.name_episode == '') { //เช้คช่องว่าง
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        type: 'warning',
        confirmButtonText: 'ตกลง'
      })
    } else {
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
          this.episodeService.updateEpisode(this.episode).subscribe(status => {
            if (status > 0) {
              Swal.fire({
                type: 'success',
                title: 'แก้ไขสำเร็จ',
                toast: true,
                timer: 1500,
                position: 'top-end',
                showConfirmButton: false,
              }).then(() => {
                this.router.navigateByUrl('/home/profile/listyourniyay')
              })
            } else {
              Swal.fire({
                type: 'error',
                title: 'ความยาวเกิน 4,294,967,295 ตัวอักษรหรือฐานข้อมูลมีปัญหา',
              })
            }
          })
        }
      })
    }
  }

  backToYourListNiyay() { //กลับไปหน้านิยายของคุณ
    this.router.navigateByUrl('/home/profile/listyourniyay');
  }

}
