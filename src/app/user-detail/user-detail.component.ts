import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params } from '@angular/router';
import { Firestore, doc, docData, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentData } from '@firebase/firestore';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAdressComponent } from '../dialog-adress/dialog-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user$: Observable<DocumentData | undefined> | undefined;
  user: User = new User();
  route: ActivatedRoute = inject(ActivatedRoute);  // Injektion der Route
  router: Router = inject(Router);  

  constructor( public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getUser();
      });
  }

  getUser() {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.user$ = docData(userDocRef, { idField: 'id' });
    
    this.user$.subscribe((user) => {
      this.user = new User(user);
      });
  }
  editMenu() {
    const dialog = this.dialog.open(DialogAdressComponent);
    dialog.componentInstance.user = new User({ ...this.user });
    dialog.componentInstance.userId = this.userId;
  }
  
  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User({ ...this.user });
    dialog.componentInstance.userId = this.userId;
  }
  
  async deleteUser(){
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      
      await deleteDoc(userDocRef);
            console.log(`User with ID ${this.userId} has been deleted.`);
            this.router.navigate(['/user']);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }   
  }
}
