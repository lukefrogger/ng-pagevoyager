import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { GlobalService } from "./services/global.service";
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  showNavi: boolean = false;
  smallScreen: boolean;
  authenticated: boolean;
  loading: boolean = false;

  constructor(public global: GlobalService){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD5Kat0NA6yZ1mdZdZ-8V0hXVLuL_eEElE",
      authDomain: "page-voyager.firebaseapp.com",
      databaseURL: "https://page-voyager.firebaseio.com",
      projectId: "page-voyager",
      storageBucket: "page-voyager.appspot.com",
      messagingSenderId: "60356058353"
    };
    firebase.initializeApp(config);
    this.setupStreams();
    this.setupPageLayout();
  }

  ngAfterViewInit() {
    
  }

  setupStreams(){
    this.global.authenticated$.subscribe( (status) => this.authenticated = status );
    this.global.loading$.subscribe( (status) => this.loading = status);
  }

  showNav(){
    this.showNavi = true;
  }

  hideNav(){
    this.showNavi = false;
  }
  
  setupPageLayout(){
    //577 is sm in boostrap
    if(window.screen.width >= 577){
      this.smallScreen = false;
      this.showNavi = true;
    } else {
      this.smallScreen = true;
      this.showNavi = false;
    }
  }
}
