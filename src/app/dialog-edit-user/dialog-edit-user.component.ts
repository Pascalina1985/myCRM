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
import { Firestore, collection, collectionData, updateDoc, doc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);
  loading = false; 
  user!: User;
  userId?: string;
  startDate = new Date(2024, 0, 1);
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){}
  async speichern(){
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
