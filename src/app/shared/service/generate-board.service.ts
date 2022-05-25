import {Injectable} from '@angular/core';
import {BoardModel} from "../model/board.model";
import {TileModel} from "../model/tile.model";
import {range} from "rxjs";
import {BoardAnswerModel} from "../model/board-answer.model";

@Injectable({
  providedIn: 'root'
})
export class GenerateBoardService {
  private ROWS_COLUMNS: number = 15;
  private MINIMUM_FILLED_TILES: number = 7;
  private FILLED_TILES: number = 2;

  constructor() {
  }

  generateANewBoard(level: number): BoardModel {
    const answerTiles: BoardAnswerModel = this.generateAnswerToBoard(level);
    const setNewTiles: TileModel[][] = this.setNewTilesSet();
    return new BoardModel(level, "Test" + level, setNewTiles, answerTiles);
  }

  private setNewTilesSet(): TileModel[][] {
    let emptyModel: TileModel[][] = [];
    for (let row:number = 0 ;row < this.ROWS_COLUMNS;  row++){
      for (let column:number = 0 ;column < this.ROWS_COLUMNS;  column++) {
        console.log(column+ ','+ row)
        emptyModel[row][column] = new TileModel(row, column, false)
      }
    }
    console.log(emptyModel);
    return emptyModel;
  }

  private chooseDifficulty(level: number): number {
    let maxFilledSquares: number;
    maxFilledSquares = this.ROWS_COLUMNS - (this.FILLED_TILES * level)
    return maxFilledSquares  ! < 0 ? maxFilledSquares : this.MINIMUM_FILLED_TILES;

  }

  private generateAnswerToBoard(level: number): BoardAnswerModel {
    let answerModelTiles: TileModel[][] = this.setNewTilesSet();
    let maxFilledSquares = this.chooseDifficulty(level);
    let answerModel: BoardAnswerModel = this.fillAnswerModel(maxFilledSquares, answerModelTiles);
    return answerModel;
  }

  private fillAnswerModel(maxFilledSquares: number, answerModelTiles: TileModel[][]): BoardAnswerModel {
    let xAmountFilled: number[] = [];
    let yAmountFilled: number[] = [];
    for (let row in answerModelTiles) {
      xAmountFilled[row] = (Math.random() * maxFilledSquares);
      for (let filled in range(xAmountFilled[row])) {
        console.log(filled)
        let tile = answerModelTiles[row][Math.random() * this.ROWS_COLUMNS];
        tile.isFilled = true;
        yAmountFilled[tile.y] = yAmountFilled[tile.y] != null ? yAmountFilled[tile.y] + 1 : 1;
      }
      console.log(answerModelTiles)
    }
    return new BoardAnswerModel(xAmountFilled, yAmountFilled, answerModelTiles)
  }

  startBoard() {
    return new BoardModel(0, "Tutorial", this.setNewTilesSet(), this.fillAllTilesOfBoard());
  }

  private fillAllTilesOfBoard(): BoardAnswerModel {
    let filledModel: TileModel[][] = [];
    for (let row:number = 0 ;row < this.ROWS_COLUMNS;  row++){
      for (let column:number = 0 ;column < this.ROWS_COLUMNS;  column++) {
        filledModel[row][column] = new TileModel(row, column, true)
      }
    }
    return new BoardAnswerModel([15 * 15], [15 * 15], filledModel);
  }
}
