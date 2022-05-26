import { Component, OnInit } from '@angular/core';
import {ScoreService} from "../../shared/service/score.service";
import {Subscription} from "rxjs";
import {HighScore} from "../../shared/model/high-score";

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  subscriptionScores: Subscription = new Subscription();
  scores: HighScore[] = [];
  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.setSubscription();
  }

  private setSubscription() {
    this.subscriptionScores = this.scoreService.highScoresSubject.subscribe(
      (newScores) => {
        this.scores = newScores;
      }
    )
  }

  GetAllScores() {
    return this.scores;

  }
}
