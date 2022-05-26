import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.css']
})
export class LivesComponent implements OnInit {
  @Input() public lives;
  constructor() { }

  ngOnInit(): void {
  }

}
