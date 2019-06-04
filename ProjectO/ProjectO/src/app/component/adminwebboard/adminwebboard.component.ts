import { Component, OnInit } from '@angular/core';
import { adminwebboard } from '../../model/admin/admin';
import { WebboardService } from '../../service/webboard/webboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminwebboard',
  templateUrl: './adminwebboard.component.html',
  styleUrls: ['./adminwebboard.component.css']
})
export class AdminwebboardComponent implements OnInit {
  p="";
  adminType: adminwebboard[]=[]
  constructor(public webboardservice:WebboardService,private router: Router) { }

  ngOnInit() {
    this.Getwebboardadmin();
  }
  
  Getwebboardadmin(){
    this.webboardservice.Getwebboardadmin(result=>{
      this.adminType = result;
    })
  }

  descriptadmin(number){
    this.router.navigate(['/home/admindescriptionwebboard'], { queryParams: { id: number } });
  }
}
