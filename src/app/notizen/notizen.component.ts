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

@Component({
  selector: 'app-notizen',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, RouterModule],
  templateUrl: './notizen.component.html',
  styleUrl: './notizen.component.scss'
})
export class NotizenComponent {
  firestore: Firestore = inject(Firestore);
  noteContent: string = '';
  userId: string = '';
  router: Router = inject(Router);
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Zugriff auf die userId, die als Routenparameter übergeben wurde
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log("UserId erhalten: ", this.userId);
      // Hier kannst du zusätzliche Daten abrufen, z.B. den User basierend auf userId laden
    });
  }

  async saveNotes() {
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      const newNote = {
        text: this.noteContent,
        date: new Date().getTime()  // Speichert das Datum als Millisekunden
      };
      
      // Füge die neue Notiz mit Datum zum Array der bestehenden Notizen hinzu
      await updateDoc(userDocRef, { notiz: arrayUnion(newNote) });
      console.log('Notiz wurde gespeichert.');
      this.router.navigate([`/notizen-anzeige/${this.userId}`]);
    } catch (error) {
      console.error('Fehler beim Speichern der Notiz:', error);
    }
  }
}
