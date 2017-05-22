import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalService } from "./services/global.service";
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hidden: boolean = true;
  
  authenticated: boolean;

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
  }

  setupStreams(){
    this.global.authenticated$.subscribe( (status) => this.authenticated = status );
  }

  showNav(){
    this.hidden = false;
  }

  hideNav(){
    this.hidden = true;
  }
  
}
