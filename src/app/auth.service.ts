import { Injectable } from '@angular/core';
import { Auth, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private router: Router, private snackBar: MatSnackBar) { 
    onAuthStateChanged(this.auth, (user) => {
      this.authState.next(user);
    });
  }

  onAuthStateChanged() {
    return this.authState.asObservable();
  }

  async logOut() {
    try {
      await signOut(this.auth);
      console.log('User logged out');
      this.snackBar.open('Sie sind ausgelogged!', 'Bis bald :-)', {
        duration: 1700, 
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1700);
          } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
