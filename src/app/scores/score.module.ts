import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScoreComponent} from "./score/score.component";
import {ScoreBoardComponent} from "./score-board/score-board.component";
import {ScoresRoutingModule} from "./scores-routing.module";


@NgModule({
  declarations: [
    ScoreComponent,
    ScoreBoardComponent
  ],
  imports: [
    CommonModule,
    ScoresRoutingModule
  ]
})
export class ScoreModule {
}
