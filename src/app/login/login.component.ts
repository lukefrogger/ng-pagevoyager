import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { GlobalService } from "../services/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public router: Router, public global: GlobalService) { }

  ngOnInit() {
  }

  logUserIn(email, pass){
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(
      (success) => {
        this.global.changeAuthStatus(true);
        this.router.navigate(['/current']);
      },
      (fail) => {
        //show errors
        console.log(fail);
      }
    );
  }

  goToSignup(){
    this.router.navigate(['/create-account']);
  }

}
