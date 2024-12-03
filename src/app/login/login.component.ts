import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router, private authService: AuthService) {}

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User logged in:', userCredential.user);
      this.router.navigate(['/dashboard']); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout() {
    await this.authService.logOut();
  }

  register(){
    this.router.navigate(['/register']); 
  }
}
