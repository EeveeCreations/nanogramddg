import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TileModel} from "../../../shared/model/tile.model";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TileComponent implements OnInit {
  @Input() public tile: TileModel;
  constructor(
  ) { }

  ngOnInit(): void {

  }

}
