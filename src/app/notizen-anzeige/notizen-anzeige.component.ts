import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Firestore, doc, docData, deleteDoc, updateDoc, arrayRemove, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { FormsModule } from '@angular/forms';
import { ArchivComponent } from '../archiv/archiv.component';


@Component({
  selector: 'app-notizen-anzeige',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule, RouterModule, MatTooltipModule, MatSlideToggleModule, FormsModule],
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
    this.getFilteredNotizen(User);
  }

  async changeNotiz(notiz: any, newStatus: boolean) {
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      const userSnapshot = await getDoc(userDocRef);
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const updatedNotizen = [...userData["notiz"]];
  
        const notizIndex = updatedNotizen.findIndex((n: any) => 
          n.text === notiz.text && 
          n.date === notiz.date
        );
  
        if (notizIndex !== -1) {
          updatedNotizen[notizIndex].erledigt = newStatus;
          await updateDoc(userDocRef, { notiz: updatedNotizen });
          console.log('Nach Update:', updatedNotizen);
        }
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Notiz:', error);
    }
  }
  
  

  getFilteredNotizen(user: any): any[] {
    if (user?.notiz && Array.isArray(user.notiz)) {
      return user.notiz.filter((notiz: any) => 
        notiz.erledigt == false || notiz.erledigt === undefined 
      );
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
