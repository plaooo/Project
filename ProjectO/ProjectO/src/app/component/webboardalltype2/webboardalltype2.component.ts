import { Component, OnInit } from '@angular/core';
import { webboard2 } from '../../model/admin/admin';
import { WebboardService } from '../../service/webboard/webboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webboardalltype2',
  templateUrl: './webboardalltype2.component.html',
  styleUrls: ['./webboardalltype2.component.css']
})
export class Webboardalltype2Component implements OnInit {
  p = "";
  typeAll2: webboard2[] = [];
  constructor(public webboardall: WebboardService,private router: Router) { }

  ngOnInit() {
    this.GetAllType2();
  }

  GetAllType2() {
    this.webboardall.GetAllTypeTwo(result => {
      this.typeAll2 = result;
    })
  }

  create(){
    this.router.navigate(['/home/createwebboard']);
   }
   
   descript(number){
    this.router.navigate(['/home/descriptionwebboard'], { queryParams: { id: number } });
  }
  
}
