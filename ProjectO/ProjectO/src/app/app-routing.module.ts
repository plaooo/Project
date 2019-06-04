import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { Page2Component } from './component/page2/page2.component';
import { RegisterComponent } from './component/register/register.component';
import { RouteComponent } from './component/route/route.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { NiyayhitComponent } from './component/niyayhit/niyayhit.component';
import { NiyaynewComponent } from './component/niyaynew/niyaynew.component';
import { SearchComponent } from './component/search/search.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CreateyourniyayComponent } from './component/createyourniyay/createyourniyay.component';
import { ListyourniyayComponent } from './component/listyourniyay/listyourniyay.component';
import { EpisodelistComponent } from './component/episodelist/episodelist.component';
import { CreateepisodeComponent } from './component/createepisode/createepisode.component';
import { UpdateepisodeComponent } from './component/updateepisode/updateepisode.component';
import { EpisodeComponent } from './component/episode/episode.component';
import { ListepisodeinniyayComponent } from './component/listepisodeinniyay/listepisodeinniyay.component';
import { WebboardComponent } from './component/webboard/webboard.component';
import { WebboardallComponent } from './component/webboardall/webboardall.component';
import { Webboardalltype2Component } from './component/webboardalltype2/webboardalltype2.component';
import { Webboardalltype3Component } from './component/webboardalltype3/webboardalltype3.component';
import { CreatewebboardComponent } from './component/createwebboard/createwebboard.component';
import { DescriptionwebboardComponent } from './component/descriptionwebboard/descriptionwebboard.component';
import { AdminwebboardComponent } from './component/adminwebboard/adminwebboard.component';
import { AdmindescriptionwebboardComponent } from './component/admindescriptionwebboard/admindescriptionwebboard.component';
import { SearchniyComponent } from './component/searchniy/search.component';
import { LoginadminComponent } from './component/loginadmin/loginadmin.component';
import { HomeadminComponent } from './component/homeadmin/homeadmin.component';
import { RouteadminComponent } from './component/routeadmin/routeadmin.component';
import { ManagementuserComponent } from './component/managementuser/managementuser.component';
import { AdmincreatewebboardComponent } from './component/admincreatewebboard/admincreatewebboard.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { YourbookfavorComponent } from './component/yourbookfavor/yourbookfavor.component';
import { UpdateprofileComponent } from './component/updateprofile/updateprofile.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: LoginadminComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  {
    path: 'homeadmin', component: RouteadminComponent,
    children: [
      { path: '', component: HomeadminComponent },
      { path: 'management', component: ManagementuserComponent },
      { path: 'createwebboardadmin', component: AdmincreatewebboardComponent }
    ]
  },
  {
    path: 'home', component: RouteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'niyayhit', component: NiyayhitComponent },
      { path: 'niyaynew', component: NiyaynewComponent },
      { path: 'webboard', component: WebboardComponent },
      { path: 'webboardalltype1', component: WebboardallComponent },
      { path: 'webboardalltype2', component: Webboardalltype2Component },
      { path: 'webboardalltype3', component: Webboardalltype3Component },
      { path: 'createwebboard', component: CreatewebboardComponent },
      { path: 'descriptionwebboard', component: DescriptionwebboardComponent },
      { path: 'admintypewebboard', component: AdminwebboardComponent },
      { path: 'admindescriptionwebboard', component: AdmindescriptionwebboardComponent },
      { path: 'search', component: SearchniyComponent },
      {
        path: 'profile', component: ProfileComponent,
        children: [
          { path: 'createyourniyay', component: CreateyourniyayComponent },
          { path: 'listyourniyay', component: ListyourniyayComponent },
          { path: 'episodelist', component: EpisodelistComponent },
          { path: 'createepisode', component: CreateepisodeComponent },
          { path: 'updateepisode/:id', component: UpdateepisodeComponent },
          { path: '', redirectTo: '/home/profile/yourbookfavor', pathMatch: 'full' },
          { path: 'yourbookfavor', component: YourbookfavorComponent },
        ]
      },
      { path: 'episode', component: EpisodeComponent },
      { path: 'listepisodeinniyay', component: ListepisodeinniyayComponent },
      { path: 'page404', component: PagenotfoundComponent },
      { path: 'editprofile', component: UpdateprofileComponent },
      { path: '**', component: PagenotfoundComponent },
    ]
  },
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
