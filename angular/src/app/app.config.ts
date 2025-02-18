import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "one-piece-2025",
      appId: "1:1032837946468:web:c569bf41a2698712b25371",
      storageBucket: "one-piece-2025.firebasestorage.app",
      apiKey: "AIzaSyC2wQT_PZHglyrT_SdM_0FnZDrfhRS05mA",
      authDomain: "one-piece-2025.firebaseapp.com",
      messagingSenderId: "1032837946468",
      measurementId: "G-D3EPNDREYD"
    })),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()), provideAnimationsAsync(),
    importProvidersFrom(AngularFireModule.initializeApp({
      apiKey: "AIzaSyCmzVR1xeyutcCDTgR8bdpmYU7WMOeKwDo",
      authDomain: "sharetoboss.firebaseapp.com",
      projectId: "sharetoboss",
      storageBucket: "sharetoboss.firebasestorage.app",
      messagingSenderId: "541957576326",
      appId: "1:541957576326:web:298d35a8baa8e0de55e307",
      measurementId: "G-48LQ5PGH9S"
    })),
  ]
};
