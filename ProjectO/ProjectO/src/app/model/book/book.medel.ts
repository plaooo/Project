import { Typebook } from '../typebook/typebook';
import { Episode } from '../episode/episode.model';

export class Book {

    id_book: number;
    name_fiction: string;
    create_day: Date;
    preview: string;
    id_user: number;
    img_book: string;
    typebook: Array<Typebook>;
    view: number;
    episode: Array<Episode>;
    count_episode: number;
    panname: string;
    reportTxt: string;
}
