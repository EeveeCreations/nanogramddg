import {Injectable} from '@angular/core';
import {BoardModel} from "../model/board.model";
import {TileModel} from "../model/tile.model";
import {BoardAnswerModel} from "../model/board-answer.model";
import {environment} from "../../../environments/environment";
import {empty} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenerateBoardService {
  private ROWS_COLUMNS: number = environment.columns_rows;
  private MINIMUM_FILLED_TILES: number = environment.mininum;
  private FILLED_TILES: number = 2;

  constructor() {
  }

  generateANewBoard(level: number): BoardModel {
    const answerTiles: BoardAnswerModel = this.generateAnswerToBoard(level);
    const setNewTiles: TileModel[][] = this.setNewTilesSet();
    return new BoardModel(level, "Level" + level, setNewTiles, answerTiles);
  }

  //Makes Enough tiles and gives every tile their position
  private setNewTilesSet(): TileModel[][] {
    let emptyModel: TileModel[][] = [[]];
    for (let row:number = 0 ;row < this.ROWS_COLUMNS;  row++){
      emptyModel[row] = [];
      for (let column:number = 0 ;column < this.ROWS_COLUMNS;  column++) {
        emptyModel[row][column] = new TileModel(row, column, false);
      }
    }
    return emptyModel;
  }

  //Based of which level you are tiles will disappear
  private chooseDifficulty(level: number): number {
    let maxFilledSquares: number;
    maxFilledSquares = this.ROWS_COLUMNS - (this.FILLED_TILES * level);
    return maxFilledSquares < this.MINIMUM_FILLED_TILES ? maxFilledSquares : this.MINIMUM_FILLED_TILES;

  }

  private generateAnswerToBoard(level: number): BoardAnswerModel {
    let answerModelTiles: TileModel[][] = this.setNewTilesSet();
    let maxFilledSquares = this.chooseDifficulty(level);
    return this.fillAnswerModel(maxFilledSquares, answerModelTiles);
  }

  private fillAnswerModel(maxFilledSquares: number, answerModelTiles: TileModel[][]): BoardAnswerModel {

    let xAmountFilled: number[] = this.countFilled()
    let yAmountFilled: number[] = [];

    for (let row in answerModelTiles) {
      //For each row we  find a random placement of the tiles, We save the amount of tiles in xAMountFilled or for columns yAmountFilled
      xAmountFilled[row] = Math.round(Math.random() * maxFilledSquares);
      //Set the amount of the wanted filled squares
      for (let filled: number = 0; filled < xAmountFilled[row]; filled++) {
        let yColumn = Math.round(Math.random() * (this.ROWS_COLUMNS -1));
        let tile: TileModel = answerModelTiles[row][yColumn];
        //Check if Tile is filled
        if (!tile.isFilled) {
          tile.isFilled = true;
        }
        //if the tile is filled. it has te be added to the Y amount  we have to watch
        yAmountFilled[yColumn] = yAmountFilled[yColumn] != null ? yAmountFilled[yColumn] + 1 : 1;
      }
    }
    for(let row in yAmountFilled){
      yAmountFilled[row].valueOf() == undefined ?  yAmountFilled[row] = 0 : yAmountFilled[row]
    }
    return new BoardAnswerModel(xAmountFilled, yAmountFilled, answerModelTiles)
  }

  private countFilled() {
    return [];
  }

  startBoard() {
    return new BoardModel(0, "Tutorial", this.setNewTilesSet(), this.fillAllTilesOfBoard());
  }

  private fillAllTilesOfBoard(): BoardAnswerModel {
    let filledModel: TileModel[][] = [];
    for (let row:number = 0 ;row < this.ROWS_COLUMNS;  row++){
      filledModel[row] = [];
      for (let column:number = 0 ;column < this.ROWS_COLUMNS;  column++) {
        //Pretty much copies setNewTileSet but gives vacj AnswerModel Fully Filled
        filledModel[row][column] = new TileModel(row, column, true);
      }
    }
    return new BoardAnswerModel([15 * 15], [15 * 15], filledModel);
  }
}
