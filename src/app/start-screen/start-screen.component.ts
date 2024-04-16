import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(
    private router: Router, 
    private firestore: Firestore
  ) {}

  async newGame() {
    const gameRef = await addDoc(collection(this.firestore, 'games'), {
      players: [],
      stack: [], // Initialize with whatever initial values you need
      playedCards: [],
      currentPlayer: 0,
      name: "New Game",
      status: "pending",
      createdAt: new Date()
    });
    this.router.navigate(['/game', gameRef.id]); // Navigate to the new game
  }
}

