export class Book {
    constructor(options){
        this.bookId = options.Id;
        this.id = options.id;
        this.title = options.title;
        this.authors = options.authors;
        this.pageCount = options.pageCount;
        this.thumbnail = options.thumbnail;
        this.isbn_13 = options.isbn_13;
        this.isbn_10 = options.isbn_10;
    }
    title: string;
    authors: Array<String>;
    id: string;
    pageCount: number;
    thumbnail: string;
    isbn_13: number;
    isbn_10: number;
    bookId: string;
}