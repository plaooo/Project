import { Component, OnInit } from '@angular/core';
import { WebboardService } from '../../service/webboard/webboard.service';
import { webboard3 } from '../../model/admin/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webboardalltype3',
  templateUrl: './webboardalltype3.component.html',
  styleUrls: ['./webboardalltype3.component.css']
})
export class Webboardalltype3Component implements OnInit {
  p="";
  typeAll3: webboard3[] = [];
  constructor(public webboardall: WebboardService,private router: Router) { }

  ngOnInit() {
    this.GetAllType3();
  }

   GetAllType3() {
    this.webboardall.GetAllTypeThree(result => {
      this.typeAll3 = result;
    })
  }

  create(){
    this.router.navigate(['/home/createwebboard']);
   }
   
   descript(number){
    this.router.navigate(['/home/descriptionwebboard'], { queryParams: { id: number } });
  }
  
}
