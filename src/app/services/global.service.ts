import { Injectable  } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Book } from "../models/book";


@Injectable()
export class GlobalService {

  public searchResults: Array<Book>;
  public selectedBook: Book;
  public currentPlans: any;
  public authenticated$ = new BehaviorSubject(null);
  public loading$ = new BehaviorSubject(null);

  constructor() { }

  changeAuthStatus(status){
    this.authenticated$.next(status);
  }

  changeLoading(status){
    this.loading$.next(status);
  }

}
