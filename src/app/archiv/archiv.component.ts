import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, doc, docData, deleteDoc, updateDoc, arrayRemove, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NotizenAnzeigeComponent } from '../notizen-anzeige/notizen-anzeige.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-archiv',
  standalone: true,
  imports: [MatCardModule, FormsModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './archiv.component.html',
  styleUrl: './archiv.component.scss'
})
export class ArchivComponent {
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

getArchivedNotizen(user: any): any[] {
  if (user?.notiz && Array.isArray(user.notiz)) {
      return user.notiz.filter((notiz: any) => notiz.erledigt === 'true');
  }
  return [];
}

getSingleUser(): void {
  const userDocRef = doc(this.firestore, `users/${this.userId}`);
  this.user$ = docData(userDocRef, { idField: 'id' });
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
