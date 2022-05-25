import {TileModel} from "./tile.model";

export class BoardModel{
  private _level: number;
  private _name: String;
  private _tiles: TileModel[][];
  private _answerTiles: TileModel[][];
  private _lives: number = 5;


  constructor(level: number, name: String, tiles: TileModel[][], answerTiles: TileModel[][]) {
    this._level = level;
    this._name = name;
    this._tiles = tiles;
    this._answerTiles = answerTiles;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get tiles(): TileModel[][] {
    return this._tiles;
  }

  set tiles(value: TileModel[][]) {
    this._tiles = value;
  }

  get lives(): number {
    return this._lives;
  }

  set lives(value: number) {
    this._lives = value;
  }

  get answerTiles(): TileModel[][] {
    return this._answerTiles;
  }

  set answerTiles(value: TileModel[][]) {
    this._answerTiles = value;
  }
}
