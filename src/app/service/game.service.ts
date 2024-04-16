// game.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private firestore: Firestore) {}

  getGame(gameId: string): Observable<any> {
    const gameRef = doc(this.firestore, `games/${gameId}`);
    return docData(gameRef);
  }

  // Additional methods to update game state can be added here
}
