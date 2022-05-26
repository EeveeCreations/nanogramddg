import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from "../../shared/model/board.model";
import {Subscription} from "rxjs";
import {GameService} from "../../shared/service/game.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  generateBoardSubscription: Subscription;
  title: String ="loading";
  board: BoardModel;

  constructor(
    private gameService: GameService
  ) {
    this.setSubscription();
  }

  ngOnInit(): void {
    this.setSubscription();
    this.returnToStart();
  }

  private returnToStart() {
    this.board.level == 0 ? this.gameService.startNewGame() :'';
  }

  private setSubscription() {
    this.generateBoardSubscription = this.gameService.boardSubject.subscribe(
      (board) =>{
        this.board = board;
      }
    )
  }

  ngOnDestroy(): void {
  }

  changeTile(x: number, y: number) {
    this.gameService.checkIfTileCorrect(x,y);
  }
}
