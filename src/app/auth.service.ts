import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

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
