import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef, MatDialogClose, MatDialogActions } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatDialogClose,
    MatInputModule, 
    MatButtonModule,
    MatDialogActions, 
    FormsModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';
  dialog: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
  ) {}
  
  
  onNoClick() {
    this.dialogRef.close();
  }
}
