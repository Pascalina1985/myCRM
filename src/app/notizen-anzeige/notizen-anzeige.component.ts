import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Firestore, doc, docData, deleteDoc, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; 


@Component({
  selector: 'app-notizen-anzeige',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule, RouterModule, MatTooltipModule],
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
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    
    if (this.userId) {
      this.getSingleUser();
    }
  }

  getSingleUser(): void {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.user$ = docData(userDocRef, { idField: 'id' });
    console.log(this.user$);
  }

  async deleteNotiz(notiz: { text: string, date: number }) {
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
       await updateDoc(userDocRef, {
        notiz: arrayRemove(notiz)
      });
      } catch (error) {
      console.error('Fehler beim Löschen der Notiz:', error);
    }
  }
  
}
