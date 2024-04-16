import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-f6845","appId":"1:144042386745:web:e0f1b673a048f79cba34e8","storageBucket":"ring-of-fire-f6845.appspot.com","apiKey":"AIzaSyD3dLIwlG6UCU7X-2aDIjUxKDkPr8YoWq4","authDomain":"ring-of-fire-f6845.firebaseapp.com","messagingSenderId":"144042386745"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
