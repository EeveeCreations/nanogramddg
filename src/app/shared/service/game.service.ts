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

  private startNewGame(){
    this.currentBoard = this.generateBoardService.generateANewBoard(this.currentBoard.level);
    this.boardSubject.next(this.currentBoard)


  }

  private setSubscription(): void{
    this.scoreSubscription = this.scoreService.currentScore.subscribe()
}



}
