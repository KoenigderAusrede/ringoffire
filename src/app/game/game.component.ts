import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatInputModule } from '@angular/material/input';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    imports: [CommonModule, PlayerComponent, GameInfoComponent, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, GameInfoComponent, GameComponent]
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  player: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1230)
    }
  }

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent)

  dialogRef.afterClosed().subscribe((name: string) => {
    if(name && name.length > 0) {
      this.game.players.push(name)
    }
  });
}
}
