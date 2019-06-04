import { Component, OnInit } from '@angular/core';
import { WebboardService } from '../../service/webboard/webboard.service';
import { webboard1, webboard2, webboard3 } from '../../model/admin/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webboardall',
  templateUrl: './webboardall.component.html',
  styleUrls: ['./webboardall.component.css']
})
export class WebboardallComponent implements OnInit {
  typeAll1: webboard1[] = [];
  p="";
  constructor(public webboardall: WebboardService,private router: Router) { }

  ngOnInit() {
    this.GetAllType1();
  }

  GetAllType1() {
    this.webboardall.GetAllTypeOne(result => {
      this.typeAll1 = result;
    })
  }
  
  create(){
    this.router.navigate(['/home/createwebboard']);
   }

   descript(number){
    this.router.navigate(['/home/descriptionwebboard'], { queryParams: { id: number } });
  }
  
}