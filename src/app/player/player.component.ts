import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor() {}

  @Input() name: any;
  @Input() playerActive: boolean = false;
}
