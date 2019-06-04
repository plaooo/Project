import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book/book.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-createepisode',
  templateUrl: './createepisode.component.html',
  styleUrls: ['./createepisode.component.css']
})
export class CreateepisodeComponent implements OnInit {

  episode: Episode = new Episode();
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

  constructor(private route: ActivatedRoute, private bookService: BookService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.episode.id_book = Number(this.route.snapshot.queryParamMap.get('id'));
      this.userService.userCurrent.subscribe(user => {
        this.user = user;
        if (user.books == null) {
          this.show = 1;
        }
      })
    } else {
      this.router.navigateByUrl('home/page404');
    }
  }

  createEpisode() {
    if (this.episode.content == null || this.episode.name_episode == null) { ///เช้ค ว่ากรอกข้อมูลครบทุกช่องไหม
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        type: 'warning'
      })
    } else {
      Swal.fire({
        title: 'ยืนยันการสร้าง',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.value) {
          this.bookService.createEpisode(this.episode).subscribe(data => { // เรียก service เพื่อ สร้าง episode
            if (data > 0) {
              Swal.fire({
                type: 'success',
                title: 'สร้างสำเร็จ',
                toast: true,
                timer: 1500,
                position: 'top-end',
                showConfirmButton: false,
              }).then(() => {
                this.router.navigate(['home/profile/episodelist'], { queryParams: { id_book: this.episode.id_book } });
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

  backToYourListNiyay() { // กลับไปหน้านิยายของคุณ
    this.router.navigateByUrl('/home/profile/listyourniyay');
  }

}
