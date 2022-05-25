export class HighScore {
  private _name: String;
  private _score: String;


  constructor(userName: String, value: number) {
  }


  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get score(): String {
    return this._score;
  }

  set score(value: String) {
    this._score = value;
  }
}
