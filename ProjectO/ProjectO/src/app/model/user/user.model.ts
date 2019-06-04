import { Book } from '../book/book.medel';

export class User {

    public id_user: number;
    public name: string;
    public lastname: string;
    public birthday: Date;
    public panname: string;
    public password: string;
    public email: string;
    public avatar: string;
    public application_date: Date;
    public status: number;
    public favor: Array<Book>;
    public books: Array<Book>;

    constructor() {

    }
}
