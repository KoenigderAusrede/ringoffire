import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from '../../models/game';

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
    const newGame = new Game(); // This will initialize and shuffle the stack
    const gameData = {
      players: newGame.players,
      stack: newGame.stack, // Make sure this is not empty
      playedCards: newGame.playedCards,
      currentPlayer: newGame.currentPlayer,
      currentCard: newGame.currentCard,
      name: newGame.name,
      status: newGame.status,
      createdAt: newGame.createdAt
    };
  
    // Add the new game data to Firestore
    const docRef = await addDoc(collection(this.firestore, "games"), gameData);
    console.log("Document written with ID: ", docRef.id);
  
    // Navigate to the new game route if needed
    this.router.navigate(['/game', docRef.id]);
  }
  
}

