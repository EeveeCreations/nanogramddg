import {Injectable} from '@angular/core';
import {BoardModel} from "../model/board.model";
import {TileModel} from "../model/tile.model";
import {range} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenerateBoardService {
  private ROWS: number = 15;
  private COLUMNS: number = 15;

  constructor() {
  }

  generateANewBoard(level: number): BoardModel {
    const answerTiles: TileModel[][] = this.generateAnswerToBoard();
    const setNewTiles: TileModel[][] = this.setNewTilesSet();
    return new BoardModel(level, "Test" + level, answerTiles, setNewTiles);
  }

  private setNewTilesSet(): TileModel[][] {
    let emptyModel: TileModel[][] = [];
    for (let row in range(0, this.ROWS)) {
        let rowNumber:number = parseInt(row);
      for (let column in range(0, this.COLUMNS)) {
        let columnNumber:number = parseInt(column);
        emptyModel[rowNumber][columnNumber] = new TileModel(rowNumber, columnNumber, false)
      }
    }
    console.log(emptyModel);
    return emptyModel;
  }

  private generateAnswerToBoard(): TileModel[][] {
    let answerModel: TileModel[][] = this.setNewTilesSet();

    return answerModel;
  }
}
