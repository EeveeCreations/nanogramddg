export class TileModel {
  private _x: number;
  private _y: number;
  private _isFilled: boolean;


  constructor(x: number, y: number, isFilled: boolean) {
    this._x = x;
    this._y = y;
    this._isFilled = isFilled;
  }


  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get isFilled(): boolean {
    return this._isFilled;
  }

  set isFilled(value: boolean) {
    this._isFilled = value;
  }
}
