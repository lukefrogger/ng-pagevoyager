import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { GlobalService } from "./global.service";

@Injectable()
export class DbConnectService {
  currentUser: any;
  planPath: any;
  options: Object;
  plan:any;
  days: any = [];
  stuff:any;
  

  constructor(private http: Http, public global: GlobalService) {
    console.log('plan-data');
    this.currentUser = firebase.auth().currentUser.uid;
    this.planPath = firebase.database().ref('userProfile/' + this.currentUser + '/plan');
    this.options = {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
  }

  insertPlan(prePlan){
    console.log(prePlan);
    let looper = Date.parse(`${prePlan.start}`);
    let endMil = Date.parse(`${prePlan.end}`);

    while(looper < endMil){
      //set the plan's start date as interation 1
      let date = new Date(looper).toLocaleDateString('en-US', this.options).split(/\s*,\s*/);
      //If a selected day matches, push into new array
      if(prePlan.aDays.has(date[0])){
        this.days.push({
          date: date[1],
          day: date[0]
        });
      }
      //add 1 day in milliseconds
      looper += 86400000;
    }
    let tpages = prePlan.bookDetails.pageCount;
    let pagesPerDay = Math.floor(tpages/this.days.length);
    
    //append the individual day records with pages per day
    for(let entry of this.days){
      let temp = {pages:pagesPerDay};
      entry = Object.assign(entry, temp);
    }
    //add book details to the Object
    this.plan = {
      authors: prePlan.bookDetails.authors,
      bookId: prePlan.bookDetails.bookId,
      title: prePlan.bookDetails.title,
      pagesComplete: 0,
      pagesTotal: tpages,
      cover: prePlan.bookDetails.thumbnail,
      days: this.days,
    }
    
    //promise to insert plan then add ID to plan and then return bool
    return this.stuff = this.planPath.push(this.plan).then( (rtn) =>{
      this.planPath.child(rtn.key).child('id').set(rtn.key);
      this.planPath.off();
      return rtn.key;
    });
  }

  getAllPlans(): any{
    this.planPath.on('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  updateWithCompletedReading(plan, dayIndex, secPerPage){
    let comp = Object.assign(plan.days[dayIndex], {completed:true});
    let updates = {};
    updates[`userProfile/${this.currentUser}/plan/${plan.id}/days/${dayIndex}`] = comp;
    updates[`userProfile/${this.currentUser}/plan/${plan.id}/timing`] = secPerPage;
    return firebase.database().ref().update(updates);
  }
}

