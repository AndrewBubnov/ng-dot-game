import { Component, AfterContentChecked } from '@angular/core';
import {GameService} from '../../services/game.service';

const width: number = window.innerWidth < 380 ? window.innerWidth * .98 : 700;

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements AfterContentChecked {
  private field: number;
  private delay: number;
  private cellSize: string;
  public gameField: Array<string>;
  private side: string = width + 'px';

  constructor(private gameService: GameService) {
    this.gameService.gameStream$.subscribe(data => this.gameField = data);
  }


  onUserClick = (e) => this.gameService.onUserClick(e);

  ngAfterContentChecked(): void {
    this.gameService.presetStream$.subscribe(data => {
      this.field = data.field;
      this.delay = data.delay;
    });
    this.cellSize = width / this.field - 4 + 'px';
  }


}
