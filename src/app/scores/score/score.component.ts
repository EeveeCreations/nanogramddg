import {Component, Input, OnInit} from '@angular/core';
import {HighScore} from "../../shared/model/high-score";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() score: HighScore;

  constructor() { }

  ngOnInit(): void {
  }

}
