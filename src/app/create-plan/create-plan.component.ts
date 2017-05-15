import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from "../services/global.service";
import { Book } from "../models/Book";

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

  constructor(public route: ActivatedRoute, public router: Router, public global: GlobalService) { 
     
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

  makeActive(day, index){
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
      console.log('set loading on');
      let s = {start: this.start};
      let e = {end: this.end};
      let d = {aDays: this.daysSet};
      let pc = {bookDetails: this.selectedBook};
      let _plan = Object.assign(s,e,d,pc);
      console.log(_plan);
      // this.planData.insertPlan(this.prePlan).then( (rtn) => {
      //   loading.dismiss();
      //   this.navCtrl.setRoot(TabNav);
      // });
    }
  }

}
