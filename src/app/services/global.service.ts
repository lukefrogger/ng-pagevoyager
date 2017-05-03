import { Injectable } from '@angular/core';
import { Book } from "../models/book";


@Injectable()
export class GlobalService {

  public searchResults: Array<Book>;
  public selectedBook: Book;

  constructor() { }

}
