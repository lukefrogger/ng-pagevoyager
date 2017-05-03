import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class DbConnectService {
  currentUser: any;
  planPath: any;
  options: Object;
  plan:any;
  days: any = [];
  planList: any;
  stuff:any;
  

  constructor(private http: Http) {
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
      title: prePlan.bookDetails.title,
      completedPages: 0,
      totalPages: tpages,
      cover: prePlan.bookDetails.thumbnail,
      days: this.days,
      pagesLeft: tpages
    }
    
    //promise to insert plan then add ID to plan and then return bool
    return this.stuff = this.planPath.push(this.plan).then( (rtn) =>{
      this.planPath.child(rtn.key).child('id').set(rtn.key);
      this.planPath.off();
      return this.plan;
    });
  }

  getPlanList(){
    this.planList = this.planPath.once('value', (data) =>{ 
      data.val(); 
    });
    this.planPath.off();
    return this.planList;
    
  }

  updateWithCompletedReading(plan, dayIndex, secPerPage){
    let comp = Object.assign(plan.days[dayIndex], {completed:true});
    let updates = {};
    updates[`userProfile/${this.currentUser}/plan/${plan.id}/days/${dayIndex}`] = comp;
    updates[`userProfile/${this.currentUser}/plan/${plan.id}/timing`] = secPerPage;
    return firebase.database().ref().update(updates);
  }
}

