import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/shared-folder/user';
import * as firebase from 'firebase/app'
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private errorAuthText = new BehaviorSubject<any>('');
  errorAuthTextObservable = this.errorAuthText.asObservable();


  logged: boolean = false

  constructor(
    private firebaseAuth: AngularFireAuth,
    private route:Router
 
  ) { }

  createUser(userDetails: User): Observable<any> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(userDetails.mail, userDetails.password).then((res) => {

        localStorage.setItem('user-details', JSON.stringify(res.user))
        this.logged = true

        res.user.updateProfile({
          displayName: userDetails.firstname + ' ' + userDetails.lastname,
        })

      }).catch((error)=>{
        this.logged = false
        this.errorAuthText.next(error)
      })
    )
  }


  signIn(userDetails: User): Observable<any> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(userDetails.mail, userDetails.password).then((res) => {
        localStorage.setItem('user-details', JSON.stringify(res.user)),
        sessionStorage.setItem('loginNotify','true'),
        this.logged = true
      }).catch((error)=>{
        this.errorAuthText.next(error)
      })
    )
  }

  logOut() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user-details');
    sessionStorage.clear()
    this.route.navigate(['/login'])
  }

  resetFunction(mail:string){
    return this.firebaseAuth.sendPasswordResetEmail(mail).then(()=>{
      console.log('password email send');
    }).catch((error)=>{
      console.log(error);
      
    })
  }


}
