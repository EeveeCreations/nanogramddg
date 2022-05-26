import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../shared/service/game.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
  }

  //"node_modules/bootstrap/dist/css/bootstrap.min.css"
  start() {
    this.gameService.startNewGame();
    this.router.navigate(['/game'],{relativeTo: this.activeRoute})
  }

  seeScores() {
    this.router.navigate(['/score'],{relativeTo: this.activeRoute})
  }
}
