import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';

@Injectable()
export class GoogleBooksService {
  books: Book[];

  constructor(private http: Http) {
    //this.books = null;
  }
  searchBooks(searchParam: string): Observable<Array<Book>>{
    console.log(searchParam);
    let replaced = searchParam.split(' ').join('+');
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${replaced}&key=AIzaSyD5Kat0NA6yZ1mdZdZ-8V0hXVLuL_eEElE`).map(res => <Array<Book>>(res.json().items))
  }
}
