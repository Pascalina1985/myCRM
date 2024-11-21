import { Component, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Firestore, doc, setDoc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-notizen',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatRadioModule],
  templateUrl: './notizen.component.html',
  styleUrl: './notizen.component.scss'
})
export class NotizenComponent {
  firestore: Firestore = inject(Firestore);
  noteContent: string = '';
  userId: string = '';
  router: Router = inject(Router);
  bemerkung: string = '';
  kategorie: string = '';
  prio: string = '';
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.userId = params['userId'];
      });
  }

  async saveNotes() {
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      const newNote = {
        text: this.noteContent,
        date: new Date().getTime(),
        bemerkung: this.bemerkung,
        kategorie: this.kategorie,
        prio: this.prio,
      };
      
      await updateDoc(userDocRef, { notiz: arrayUnion(newNote) });
      this.router.navigate([`/notizen-anzeige/${this.userId}`]);
    } catch (error) {
      console.error('Fehler beim Speichern der Notiz:', error);
    }
  }
}
