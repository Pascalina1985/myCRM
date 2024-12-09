import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, RouterLink, MatDialogModule, MatDatepickerModule, MatNativeDateModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoggedIn = false;
  title = 'myCRM';
  firestore: Firestore = inject(Firestore);
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.onAuthStateChanged().subscribe((user) => {
      this.isLoggedIn = !!user; 
    });
  }
  
  async logOutC(){
    await this.authService.logOut()
  }
  
}
