import { Injectable } from '@angular/core';
import { Auth, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private router: Router) { 
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
      this.router.navigate(['']); // Leite den Benutzer zur Login-Seite um
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
