import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'] 
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore); 
  user: User = new User(); 
  startDate = new Date(2024, 0, 1);
  loading = false;

  
  users$: Observable<User[]>;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const usersCollection = collection(this.firestore, 'users');

    this.users$ = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

   async speichern() {
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');
    
    try {
      const result = await addDoc(usersCollection, { ...this.user });
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Nutzers:', error);
    }
  }

  }
