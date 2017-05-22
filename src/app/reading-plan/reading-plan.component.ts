import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GlobalService } from "../services/global.service";
import { Book } from "../models/Book";

@Component({
  selector: 'app-reading-plan',
  templateUrl: './reading-plan.component.html',
  styleUrls: ['./reading-plan.component.scss']
})
export class ReadingPlanComponent implements OnInit {

  plan: any;
  todaysReading: any;

  constructor(public route: ActivatedRoute, public router: Router, public global: GlobalService) { }

  ngOnInit() {
    this.getReadingPlan(this.route.snapshot.params['id']);
  }

  getReadingPlan(urlId){
    for(let tempPlan of this.global.currentPlans){
      if(tempPlan.id = urlId){
        this.plan = tempPlan;
        this._getTodaysReading();
      }
    }
  }

  _getTodaysReading(){
    let counter = 0;
    for(let day of this.plan.days){
      counter++;
      if(!day.completed){
        this.todaysReading = day;
        this.todaysReading.count = counter;
        break;
      }
    }
  }
}
