import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Episode } from 'src/app/model/episode/episode.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private episodeSource = new BehaviorSubject(new Episode);
  episodeCurrent = this.episodeSource.asObservable();


  constructor(private http: HttpClient) { }

  changeEpisode(episode: Episode) {
    this.episodeSource.next(episode)
  }

  getEpisodeByIDEpisode(id_episode) {
    return <Observable<Episode>>this.http.get('http://localhost:9999/episode/' + id_episode).pipe();
  }

  updateEpisode(episode: Episode) {
    return this.http.put('http://localhost:9999/episode', episode);
  }

  getEpisodeByIDOrder(id_book, start) {
    return <Observable<Episode[]>>this.http.get('http://localhost:9999/episodes/order/' + id_book + '/' + start).pipe();
  }

  updateEpisodeView(episode: Episode) {
    return this.http.get('http://localhost:9999/episodeview/' + episode.view + '/' + episode.id_episode);
  }
}
