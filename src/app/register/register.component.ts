import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  passwordPattern = ".{6,}";
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  constructor(private auth: Auth, private router: Router, private snackBar: MatSnackBar) {}

  async register(event: Event) {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User registered:', userCredential.user);
      this.snackBar.open('Rigistrierung erfolgreich!', 'Viel Spaß', {
        duration: 3000, // 3 Sekunden sichtbar
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 3000);
          } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }
}
