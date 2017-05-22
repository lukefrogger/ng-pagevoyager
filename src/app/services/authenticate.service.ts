import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthenticateService {

  constructor() { }

  createUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
      let errorCode = error;
      let errorMessage = error.message;
    });
  }

  
}
