import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routeadmin',
  templateUrl: './routeadmin.component.html',
  styleUrls: ['./routeadmin.component.css']
})
export class RouteadminComponent implements OnInit {
  path = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.path = this.router.url;
    console.log(this.path);
  }

}
