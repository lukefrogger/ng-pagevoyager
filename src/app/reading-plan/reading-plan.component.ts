import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GlobalService } from "../services/global.service";
import { DbConnectService } from "../services/db-connect.service";
import { Book } from "../models/book";

@Component({
  selector: 'app-reading-plan',
  templateUrl: './reading-plan.component.html',
  styleUrls: ['./reading-plan.component.scss']
})
export class ReadingPlanComponent implements OnInit {

  plan: any;
  todaysReading: any;
  error: boolean = false;
  errorMsg: string;
  behind: boolean = true;

  constructor(public route: ActivatedRoute, public router: Router, public global: GlobalService, public db: DbConnectService) { }

  ngOnInit() {
    this.getReadingPlan(this.route.snapshot.params['id']);
  }

  getReadingPlan(urlId){
    for(let tempPlan of this.global.currentPlans){
      if(tempPlan.id == urlId){
        this.plan = tempPlan;
        this._getTodaysReading();
        break;
      }
    }
  }

  _getTodaysReading(){
    for(let day of this.plan.days){
      if(!day.completed){
        this.todaysReading = day;
        break;
      }
    }
  }

  updateReadingPlan(){
    this.db.updateWithCompletedReading(this.plan, this.todaysReading.count-1).then(
      (success) => this._getTodaysReading(),
      (fail) => {
        this.error = true;
        this.errorMsg = 'There was an problem updating your reading plan.';
      }
    )
  }

  recalculatePlan(){
    this.db.recalculatePlan(this.plan, this.todaysReading.dayCount).then(

    )
  }

}
