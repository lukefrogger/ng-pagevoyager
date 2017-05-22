export class Book {
    constructor(options){
        this.bookId = options.bookId;
        this.id = options.id;
        this.title = options.title;
        this.authors = options.authors;
        this.pageCount = options.pageCount;
        this.thumbnail = options.thumbnail;
    }
    title: string;
    authors: Array<String>;
    id: string;
    pageCount: number;
    thumbnail: string;
    bookId: string;
}