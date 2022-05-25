import { Injectable } from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {BoardModel} from "../model/board.model";
import {ScoreService} from "./score.service";
import {GenerateBoardService} from "./generate-board.service";
import {TileService} from "./tile.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public boardSubject: Subject<BoardModel> = new Subject<BoardModel>();
  public scoreSubscription: Subscription = new Subscription();
  private currentBoard: BoardModel;

  constructor(
    private generateBoardService: GenerateBoardService,
    private tileService: TileService,
    private scoreService: ScoreService
  ) {
    this.setSubscription();
  }

  startNewGame(){
    this.currentBoard = this.generateBoardService.startBoard();
    this.startNewRound();
  }

  startNewRound(){
    this.currentBoard = this.generateBoardService.generateANewBoard(this.currentBoard.level);
    this.boardSubject.next(this.currentBoard);
  }


  private setSubscription(): void{
    this.scoreSubscription = this.scoreService.currentScore.subscribe();
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
    this.boardSubject.next(this.currentBoard);
  }

  private GameOver() {

    return null;
  }
}
