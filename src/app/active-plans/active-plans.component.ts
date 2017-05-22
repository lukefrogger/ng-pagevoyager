import { Component, OnInit } from '@angular/core';
import { DbConnectService } from "../services/db-connect.service";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { GlobalService } from "../services/global.service";

@Component({
  selector: 'app-active-plans',
  templateUrl: './active-plans.component.html',
  styleUrls: ['./active-plans.component.scss']
})
export class ActivePlansComponent implements OnInit {

  plans: any;
  sortedPlans: any = this.global.currentPlans;
  empty: boolean = false;

  constructor(public db: DbConnectService, public global: GlobalService, public router: Router) { }

  ngOnInit() {
    this.getAllPlans();
  }

  getAllPlans(){
    //only get the plans if they aren't in global
    if(this.sortedPlans === undefined){
      this.plans = this.db.planPath.once('value').then( (snapshot) => {
        this._setData(snapshot.val());
      });
    }
    
  }

  _setData(data){
    if(data != null){
      this.global.currentPlans = Object.keys(data).map(key => data[key]);
      this.sortedPlans = Object.keys(data).map(key => data[key]);
      console.log(this.sortedPlans);
    } else {
      this.empty = true;
    }
    
  }

  goToSearch(){
    this.router.navigate(['/search']);
  }

  goToPlan(plan){
    this.router.navigate(['/reading-plan', plan.id]);
  }

}
