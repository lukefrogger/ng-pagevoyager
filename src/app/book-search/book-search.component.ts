import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksService } from "../services/google-books.service";
import { Book } from "../models/book";
import { GlobalService } from "../services/global.service";

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchParam: string;
  sortedBooks: Array<Book> = this.global.searchResults;

  constructor(
    public booksApi: GoogleBooksService, 
    public route: ActivatedRoute, 
    public router: Router, 
    public global: GlobalService) { }

  ngOnInit() {
  }

  searchForBook(): void{
    if(this.searchParam !=  undefined){
      this.booksApi.searchBooks(this.searchParam)
        .subscribe(
          (books) => this.sortedBooks = this.sortBooks(books),
          (error) => console.log('error error error')
        );
    } else {
      
    }
    
  }

  sortBooks(books): Array<Book>{
      let tempBooksList = [];
      let image:string = '';
      for(let book of books){
        if(book.volumeInfo.imageLinks){
          image = book.volumeInfo.imageLinks.thumbnail.replace("http", "https");
        }
        let booksObject = new Book({
          bookId: book.id ? book.id : '',
          title: book.volumeInfo.title ? book.volumeInfo.title : '',
          authors: book.volumeInfo.authors ? book.volumeInfo.authors : [],
          pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : '',
          thumbnail: book.volumeInfo.imageLinks ? image : '',
          isbn_10: book.volumeInfo.industryIdentifiers[0] ? book.volumeInfo.industryIdentifiers[0].identifier : '',
          isbn_13: book.volumeInfo.industryIdentifiers[1] ? book.volumeInfo.industryIdentifiers[1].identifier : '',
          rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : ''
        });
        tempBooksList.push(booksObject);
      }
      this.global.searchResults = tempBooksList;
      return tempBooksList;
  }

  bookTapped(book){
    console.log(book);
    this.global.selectedBook = book;
    this.router.navigate(['/create']);
  }

}
