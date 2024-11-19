import { Component, inject, OnInit } from '@angular/core';
import { NotizenAnzeigeComponent } from '../notizen-anzeige/notizen-anzeige.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, collection, collectionData, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user$: Observable<DocumentData[]> | undefined;
  users: User[] = [];
  userIds: string[] = [];
  constructor(private router: Router){
  }

  ngOnInit(): void {
    this.getUsers();
    }

  getUsers() {
    const usersCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(usersCollection, { idField: 'id' });

    // Abonniere die Observable und speichere die Benutzer im lokalen Array
    this.user$.subscribe(
      (usersData) => {
        this.users = usersData.map(user => new User(user)); // Mappe auf User-Objekte
        console.log('Benutzer erfolgreich geladen:', this.users);
        this.userIds = usersData.map(user => user['id']); 
        console.log('Alle User IDs:', this.userIds);
      },
      (error) => {
        console.error('Fehler beim Laden der Benutzer:', error);
      }
    );
  }
}
