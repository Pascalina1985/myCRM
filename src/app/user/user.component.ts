import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCardModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]>;
  allUsers: any[] = [];

  constructor(public dialog: MatDialog, private auth: Auth, private router: Router, private ngZone: NgZone){
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' });
    }

    ngOnInit(): void {
      this.auth.onAuthStateChanged((user) => {
        if (!user) {
          this.ngZone.run(() => {
            this.router.navigate(['/']); 
          });
        } else {
          this.users$.subscribe((users) => {
            this.allUsers = users;
          });
        }
      });
    }

    openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

  }
