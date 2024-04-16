import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatInputModule } from '@angular/material/input';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, docData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    imports: [CommonModule, PlayerComponent, GameInfoComponent, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, GameInfoComponent]
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  currentCard: string = '';
  game: any;
  player: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    if (gameId) {
      this.gameService.getGame(gameId).subscribe(gameData => {
        this.game = gameData;
      });
    }
  }

  async newGame() {
    this.game = new Game(); // Initialize a new Game object

    // Create a simple object from the game instance to store in Firestore
    const gameData = {
      players: this.game.players,
      stack: this.game.stack,
      playedCards: this.game.playedCards,
      currentPlayer: this.game.currentPlayer,
      name: this.game.name,
      status: this.game.status,
      createdAt: this.game.createdAt
    };

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(this.firestore, "games"), gameData);
        console.log("Document written with ID: ", docRef.id);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1230);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.trim().length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
