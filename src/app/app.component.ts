import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartScreenComponent, CommonModule, GameComponent, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ringoffire';
}
