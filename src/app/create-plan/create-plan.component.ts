import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from "../services/global.service";
import { Book } from "../models/Book";
import { DbConnectService } from "../services/db-connect.service";

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {

  selectedBook: Book;
  start: Date = new Date();
  end: Date =  new Date();
  daysSet: any = new Set();

  show0: boolean;
  show1: boolean;
  show2: boolean;
  show3: boolean;
  show4: boolean;
  show5: boolean;
  show6: boolean;

  constructor(public router: Router, public global: GlobalService, public db: DbConnectService) { 
     
  }

  ngOnInit() {
    this.selectedBook = this.global.selectedBook;
    this.goBackIfNoBook();
  }

  goBackIfNoBook(){
    if(this.selectedBook === undefined){
      this.router.navigate(['/search']);
      window.location.reload();
    }
  }

  makeActive(day){
    if(this.daysSet.has(day)){
      this.daysSet.delete(day);
    } else  {
      this.daysSet.add(day)
    }
  }

  createReadingPlan(){
    if(this.daysSet.size == 0 || this.start == undefined || this.end == undefined){
       console.log('input needed');
    } else {
      let s = {start: this.start};
      let e = {end: this.end};
      let d = {aDays: this.daysSet};
      let pc = {bookDetails: this.selectedBook};
      let _plan = Object.assign(s,e,d,pc);
      this.db.insertPlan(_plan).then( (rtn) => {
        console.log(rtn);
        this.router.navigate(['/reading-plan', rtn]);
      });
    }
  }

}
