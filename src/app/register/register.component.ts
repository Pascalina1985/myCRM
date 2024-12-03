import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) {}

  async register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User registered:', userCredential.user);

      // Redirect to dashboard after successful registration
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  navigateToLogin() {
    // Navigate to login page
    this.router.navigate(['']);
  }
}
