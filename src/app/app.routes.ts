import { Routes, RouterModule } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game/:gameId', component: GameComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}