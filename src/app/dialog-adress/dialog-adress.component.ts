import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-adress',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, FormsModule, CommonModule],
  templateUrl: './dialog-adress.component.html',
  styleUrl: './dialog-adress.component.scss'
})
export class DialogAdressComponent {
  firestore: Firestore = inject(Firestore);
  loading = false; 
  user!: User;
  userId?: string;

  constructor(public dialogRef: MatDialogRef<DialogAdressComponent>){}

  async speichern() {
    this.loading = true;
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userDocRef, { ...this.user });
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }
}
