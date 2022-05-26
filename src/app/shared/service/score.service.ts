import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {HighScore} from "../model/high-score";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  highScoresSubject: Subject<HighScore[]> = new Subject<HighScore[]>();
  currentScore: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  highScores: HighScore[];

  constructor() {
  }


  public updateScore(): void{

  }

  public addScoreToHighScore(userName: String){
    this.highScores.push(new HighScore(userName, this.currentScore.value))
  }

  public getHighScores(): HighScore[]{
    return this.highScores;
  }

}
