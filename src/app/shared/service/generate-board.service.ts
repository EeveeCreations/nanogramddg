import {Injectable} from '@angular/core';
import {BoardModel} from "../model/board.model";
import {TileModel} from "../model/tile.model";
import {BoardAnswerModel} from "../model/board-answer.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenerateBoardService {
  private ROWS_COLUMNS: number = environment.columns_rows;
  private MINIMUM_FILLED_TILES: number = environment.minimum;
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
    if(maxFilledSquares < this.MINIMUM_FILLED_TILES){
      maxFilledSquares = this.MINIMUM_FILLED_TILES;
    }
    console.log(maxFilledSquares)
    return maxFilledSquares;

  }

  private generateAnswerToBoard(level: number): BoardAnswerModel {
    let answerModelTiles: TileModel[][] = this.setNewTilesSet();
    let maxFilledSquares = this.chooseDifficulty(level);
    return this.fillAnswerModel(maxFilledSquares, answerModelTiles);
  }

  private fillAnswerModel(maxFilledSquares: number, answerModelTiles: TileModel[][]): BoardAnswerModel {
    for (let row in answerModelTiles) {
      let filledAmount = Math.round(Math.random() * maxFilledSquares) + this.MINIMUM_FILLED_TILES;
      //Set the amount of the wanted filled squares
      for (let filled: number = 0; filled < filledAmount; filled++) {
        let yColumn = Math.round(Math.random() * (this.ROWS_COLUMNS - 1));
        let tile: TileModel = answerModelTiles[row][yColumn];
        //Check if Tile is filled
        if (!tile.isFilled) {
          tile.isFilled = true;
        }
      }
    }
    const amounts = this.countFilled(answerModelTiles)
    let xAmountFilled: number[] = amounts[0];
    let yAmountFilled: number[] = amounts[1];
    console.log(answerModelTiles)
    return new BoardAnswerModel(xAmountFilled, yAmountFilled, answerModelTiles)
  }

  //For each row we  find a random placement of the tiles, We save the amount of tiles in xAMountFilled or for columns yAmountFilled
  private countFilled(tiles: TileModel[][]): number[][] {
    let amountX: number[] = new Array(this.ROWS_COLUMNS).fill(0);
    let amountY: number[] = new Array(this.ROWS_COLUMNS).fill(0);

    for (let row of tiles) {
      for (let tile of row) {
        if (tile.isFilled) {
          //  If the tile is filled count it up in the specific row and column
          amountX[tile.x] ++;
          amountY[tile.y] ++;
        }
      }
    }

    return [amountX, amountY];
  }

  startBoard() {
    return new BoardModel(0, "Tutorial", this.setNewTilesSet(), this.fillAllTilesOfBoard());
  }

  private fillAllTilesOfBoard(): BoardAnswerModel {
    let filledModel: TileModel[][] = [];
    for (let row: number = 0; row < this.ROWS_COLUMNS; row++) {
      filledModel[row] = [];
      for (let column:number = 0 ;column < this.ROWS_COLUMNS;  column++) {
        //Pretty much copies setNewTileSet but gives vacj AnswerModel Fully Filled
        filledModel[row][column] = new TileModel(row, column, true);
      }
    }
    return new BoardAnswerModel([15 * 15], [15 * 15], filledModel);
  }
}
