// src/main.ts oder src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Angular Fire und Firebase SDK-Imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

// Firebase Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBB1zQqgNh2QAQt8717h7HeX1cd-eHDi5A",
  authDomain: "mycrm-52752.firebaseapp.com",
  projectId: "mycrm-52752",
  storageBucket: "mycrm-52752.appspot.com",
  messagingSenderId: "181446028171",
  appId: "1:181446028171:web:cafdf03bbf2e57da331d8e"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),  // Asynchronous Animation Provisioning (Optional)
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
