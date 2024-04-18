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
  game: any = { players: [], stack: [], playedCards: [], currentPlayer: 0, name: '', status: '', createdAt: new Date() };  // Default empty structure
  player: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    if (gameId) {
      this.gameService.getGame(gameId).subscribe(gameData => {
        console.log("Game data loaded:", gameData);
        if (gameData && gameData.stack) {
          this.game = gameData;
        } else {
          // If the stack is not present, we may want to initialize the game locally or handle the error
          console.error('Game data fetched does not have a stack, initializing a new game.');
          this.game = new Game();
        }
      }, error => {
        console.error("Failed to load game data:", error);
      });
    }
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
