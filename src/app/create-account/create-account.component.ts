import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { GlobalService } from "../services/global.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  selectedBook: any;

  constructor(private router: Router, public global: GlobalService) { }

  ngOnInit() {
     
  }
  createUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
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

}
