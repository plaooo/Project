            import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/model/episode/episode.model';
import { BookService } from 'src/app/service/book/book.service';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-episodelist',
  templateUrl: './episodelist.component.html',
  styleUrls: ['./episodelist.component.css']
})
export class EpisodelistComponent implements OnInit {

  episodes: Array<Episode>
  user: User
  show: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private episodeService: EpisodeService, private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => { //get ค่า user จาก service
        this.user = user;
        if (user.books != null) {
          this.bookService.getEpisodeByID(this.route.snapshot.queryParamMap.get('id_book'), user.id_user).subscribe(episodes => { // get episode ทั้งหมด จาก id_book และ id_user
            this.episodes = episodes;
          })
        } else {
          this.show = 1;
        }
      })
    } else {
      this.router.navigateByUrl('home/page404');
    }
  }

  clickChangeComponent() { //เปลี่ยน หน้าไปหน้า สร้าง episode
    this.router.navigate(['home/profile/createepisode'], { queryParams: { id: this.route.snapshot.queryParamMap.get('id_book') } })
  }

  backToYourListNiyay() { //กลับไปหน้านิยาายของคุณ
    this.router.navigateByUrl('/home/profile/listyourniyay');
  }
}
