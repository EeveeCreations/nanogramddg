import {TileModel} from "./tile.model";

export class BoardAnswerModel {
  private _xFilledSquares: number[];
  private _yFilledSquares: number[];
  private _answerTiles: TileModel[][];


  constructor(xFilledSquares: number[], yFilledSquares: number[], answerTiles: TileModel[][]) {
    this._xFilledSquares = xFilledSquares;
    this._yFilledSquares = yFilledSquares;
    this._answerTiles = answerTiles;
  }

  get xFilledSquares(): number[] {
    return this._xFilledSquares;
  }

  set xFilledSquares(value: number[]) {
    this._xFilledSquares = value;
  }

  get yFilledSquares(): number[] {
    return this._yFilledSquares;
  }

  set yFilledSquares(value: number[]) {
    this._yFilledSquares = value;
  }

  get answerTiles(): TileModel[][] {
    return this._answerTiles;
  }

  set answerTiles(value: TileModel[][]) {
    this._answerTiles = value;
  }
}
