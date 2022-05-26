import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {BoardModel} from "../model/board.model";
import {ScoreService} from "./score.service";
import {GenerateBoardService} from "./generate-board.service";
import {TileService} from "./tile.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public boardSubject: BehaviorSubject<BoardModel> = new BehaviorSubject<BoardModel>(this.generateBoardService.startBoard());
  public scoreSubscription: Subscription = new Subscription();
  private currentBoard: BoardModel;
  private currentScore: number;

  constructor(
    private generateBoardService: GenerateBoardService,
    private tileService: TileService,
    private scoreService: ScoreService
  ) {
    this.setSubscription();
  }

  startNewGame(){
    this.currentBoard = this.boardSubject.value
    this.startNewRound();
  }

  startNewRound(){
    this.currentBoard = this.generateBoardService.generateANewBoard(this.currentBoard.level +1);
    this.boardSubject.next(this.currentBoard);

  }


  private setSubscription(): void{
    this.scoreSubscription = this.scoreService.currentScore.subscribe(
      (newScore) =>{
        this.currentScore = newScore;
      }
    );
    this.boardSubject.subscribe(
      (newBoard) =>{
        this.currentBoard = newBoard;
      }
    )
}

  checkIfTileCorrect(x: number, y: number){
    this.currentBoard.answerTiles.answerTiles[x][y].isFilled == true ? this.fillTile(x,y): this.inCorrectPlacement();
  }

  private inCorrectPlacement() {
    this.removeLife();
  }

  private removeLife() {
    this.currentBoard.lives -= 1
    this.currentBoard.lives == 0 ? this.GameOver() : null;
  }

  private updateLives() {

  }

  fillTile(x: number, y: number) {
    this.currentBoard.tiles[x][y].isFilled = true;
    this.currentBoard.tiles == this.currentBoard.answerTiles.answerTiles ? this.gameWon(): '';
    this.boardSubject.next(this.currentBoard);
  }

  private gameWon() {
    this.sendCongrats();
    this.startNewRound();
  }

  private sendCongrats() {
    if(window.confirm("You Found the image! Can you see what it is ?")){
      this.startNewRound();
    }

  }

  private GameOver() {

    return null;
  }

}
