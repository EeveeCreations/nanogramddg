import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from './board/board.component';
import {LivesComponent} from './lives/lives.component';
import {BoardRoutingModule} from "./board-routing.module";
import {TileComponent} from "./board/tile/tile.component";


@NgModule({
  declarations: [
    BoardComponent,
    LivesComponent,
    TileComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
