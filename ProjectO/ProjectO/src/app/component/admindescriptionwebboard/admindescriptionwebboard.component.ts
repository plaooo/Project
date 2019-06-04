import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebboardService } from '../../service/webboard/webboard.service';
import { filter } from 'rxjs/operators';
import { adminwebboard } from '../../model/admin/admin';

@Component({
  selector: 'app-admindescriptionwebboard',
  templateUrl: './admindescriptionwebboard.component.html',
  styleUrls: ['./admindescriptionwebboard.component.css']
})
export class AdmindescriptionwebboardComponent implements OnInit {
  adminType: adminwebboard[]=[];
  id: number;
  text: String="";
  collecttext:String="";
  constructor(private route: ActivatedRoute,private webservice:WebboardService) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(event => event.id)
    ).subscribe((event) => {
      this.id = event.id
      this.Getdesadminwebboard(this.id);
    });
  }

  Getdesadminwebboard(number){
    let body = {idAdminWebboard:number}
    this.webservice.Getdesadminwebboard(body,result=>{
      this.adminType = result;
      this.text = this.adminType[0].headderWebboard;
      this.collecttext= this.adminType[0].collectWebboard;
    })
  }

}
