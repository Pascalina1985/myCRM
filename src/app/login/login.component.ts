import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordPattern = ".{6,}";
  
  constructor(private auth: Auth, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  async login(event: Event) {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User logged in:', userCredential.user);
      this.snackBar.open('Login erfolgreich! Willkommen zurück!', 'Viel Spaß', {
        duration: 1500, 
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigate(['/dashboard']); 
      }, 1700);
      
    } catch (error) {
      console.error('Login failed:', error);
      this.snackBar.open('Login fehlgeschlagen! Bitte überprüfe deine Daten.', 'Oder Registrieren!', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigate(['/register']);
      }, 3000);
          }
  }

  async logout() {
    await this.authService.logOut();
  }

  register(){
    this.router.navigate(['/register']); 
  }
}
