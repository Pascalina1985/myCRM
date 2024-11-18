import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Firestore, doc, docData, deleteDoc, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notizen-anzeige',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './notizen-anzeige.component.html',
  styleUrl: './notizen-anzeige.component.scss'
})
export class NotizenAnzeigeComponent {
  firestore: Firestore = inject(Firestore);
  userId: string = '';
  user$: Observable<any> | undefined;
  
  constructor(private route: ActivatedRoute){
  }

  ngOnInit(): void {
    // Den Parameter 'userId' aus der URL holen
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    console.log(this.userId);

    // Falls userId existiert, hole die Benutzerdaten aus Firestore
    if (this.userId) {
      this.getSingleUser();
    }
  }

  getSingleUser(): void {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.user$ = docData(userDocRef, { idField: 'id' });
    console.log(this.user$);
  }

  deleteNotiz(){}
  
}
