import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {BoardModel} from "../model/board.model";
import {ScoreService} from "./score.service";
import {GenerateBoardService} from "./generate-board.service";
import {TileService} from "./tile.service";
import {Router} from "@angular/router";
import {TileModel} from "../model/tile.model";

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
    private scoreService: ScoreService,
    private routeService: Router
  ) {
    this.setSubscription();
  }

  startNewGame(){
    this.currentBoard = this.boardSubject.value
    this.startNewRound();
  }

  startNewRound(){
    //We go a level up!
    this.currentBoard = this.generateBoardService.generateANewBoard(this.currentBoard.level + 1);
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
    window.alert("This Tile is not correct Think again!")
    this.removeLife();
  }

  private removeLife() {
    this.currentBoard.lives -= 1
    this.currentBoard.lives == 0 ? this.GameOver() : null;
  }

  private updateLives() {

  }

  fillTile(x: number, y: number) {
     const tile: TileModel = this.currentBoard.tiles[x][y]
      tile.isFilled = true;
      if (this.isTheGameWon()) {
        this.roundWon();
      }
      this.boardSubject.next(this.currentBoard);
  }

  //this.currentBoard.answerTiles.answerTiles.toString()

  private isTheGameWon() {
    const filledArray = this.generateBoardService.countFilled(this.currentBoard.tiles);
    const answerTilesX = this.currentBoard.answerTiles.xFilledSquares
    const answerTilesY = this.currentBoard.answerTiles.yFilledSquares
    //Arrays  can't be  direcly compaird to eachother so we compare it per element
    const xArray  = filledArray[0].every(function (tile, index) {
        return tile === answerTilesX[index];
    });
    const yArray  = filledArray[1].every(function (tile, index) {
      return tile === answerTilesY[index];
    });
    return xArray && yArray
  }

  private roundWon() {
    this.sendCongrats();
  }

  private sendCongrats() {
    if (window.confirm("You Found the image! Can you see what it is ?")) {
      this.currentBoard.level == 3 ? this.gameFinished() : this.startNewGame();
    } else {
      this.leaveTheGame();
    }
  }

  private gameFinished() {
    if (window.confirm("You finnished Level 3! Goodjob!")) {
      this.leaveTheGame();
    }
  }


  private GameOver() {
    if (window.confirm("you ran out of lives. Do you wan to try again ?")) {
      this.currentBoard.level = 0;
      this.startNewGame();
    } else {
      this.leaveTheGame();
    }
  }

  private leaveTheGame() {
    this.currentBoard.level = 0;
    this.routeService.navigate(['./home'])
  }
}
