import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { NavComponent } from './component/nav/nav.component';
import { Page2Component } from './component/page2/page2.component';
import { RegisterComponent } from './component/register/register.component';
import { RouteComponent } from './component/route/route.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { NiyayhitComponent } from './component/niyayhit/niyayhit.component';
import { NiyaynewComponent } from './component/niyaynew/niyaynew.component';
import { SearchComponent } from './component/search/search.component';
import { RegisterService } from './service/register/register.service';
import { LoginService } from './service/login/login.service';
import { JwtService } from './service/jwt/jwt.service';
import { ProfileComponent } from './component/profile/profile.component';
import { UserService } from './service/user/user.service';
import { CreateyourniyayComponent } from './component/createyourniyay/createyourniyay.component';
import { BookService } from './service/book/book.service';
import { ListyourniyayComponent } from './component/listyourniyay/listyourniyay.component';
import { CreateepisodeComponent } from './component/createepisode/createepisode.component';
import { EpisodelistComponent } from './component/episodelist/episodelist.component';
import { EpisodeComponent } from './component/episode/episode.component';
import { UpdateepisodeComponent } from './component/updateepisode/updateepisode.component';
import { EpisodeService } from './service/episode/episode.service';
import { ListepisodeinniyayComponent } from './component/listepisodeinniyay/listepisodeinniyay.component';

import { AdmincreatewebboardComponent } from './component/admincreatewebboard/admincreatewebboard.component';
import { AdmindescriptionwebboardComponent } from './component/admindescriptionwebboard/admindescriptionwebboard.component';
import { AdminwebboardComponent } from './component/adminwebboard/adminwebboard.component';
import { DescriptionwebboardComponent } from './component/descriptionwebboard/descriptionwebboard.component';
import { HomeadminComponent } from './component/homeadmin/homeadmin.component';
import { LoginadminComponent } from './component/loginadmin/loginadmin.component';
import { ManagementuserComponent } from './component/managementuser/managementuser.component';
import { NavadminComponent } from './component/navadmin/navadmin.component';
import { RouteadminComponent } from './component/routeadmin/routeadmin.component';
import { SearchniyComponent } from './component/searchniy/search.component';
import { WebboardComponent } from './component/webboard/webboard.component';
import { WebboardallComponent } from './component/webboardall/webboardall.component';
import { Webboardalltype2Component } from './component/webboardalltype2/webboardalltype2.component';
import { Webboardalltype3Component } from './component/webboardalltype3/webboardalltype3.component';
import { CreatewebboardComponent } from './component/createwebboard/createwebboard.component';
import { YourbookfavorComponent } from './component/yourbookfavor/yourbookfavor.component';

import { NametypePipe } from './service/search/nametype.pipe';

import {  NgxPaginationModule } from 'ngx-pagination';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { UpdateprofileComponent } from './component/updateprofile/updateprofile.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    Page2Component,
    RegisterComponent,
    RouteComponent,
    PagenotfoundComponent,
    NiyayhitComponent,
    NiyaynewComponent,
    SearchComponent,
    ProfileComponent,
    CreateyourniyayComponent,
    ListyourniyayComponent,
    CreateepisodeComponent,
    EpisodelistComponent,
    EpisodeComponent,
    UpdateepisodeComponent,
    ListepisodeinniyayComponent,
    AdmincreatewebboardComponent,
    AdmindescriptionwebboardComponent,
    AdminwebboardComponent,
    DescriptionwebboardComponent,
    HomeadminComponent,
    LoginadminComponent,
    ManagementuserComponent,
    NavadminComponent,
    RouteadminComponent,
    SearchniyComponent,
    WebboardComponent,
    WebboardallComponent,
    Webboardalltype2Component,
    Webboardalltype3Component,
    CreatewebboardComponent,
    NametypePipe,
    ChangepasswordComponent,
    YourbookfavorComponent,
    UpdateprofileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ButtonModule,
    AppRoutingModule,
    CarouselModule,
    DropdownModule,
    HttpClientModule,
    TabViewModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    NgxPaginationModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [
    RegisterService,
    LoginService,
    JwtService,
    UserService,
    BookService,
    EpisodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
