import { Component, AfterContentChecked } from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements AfterContentChecked {
  private field: number;
  private delay: number;
  private cellSize: string;
  public gameField: Array<string>

  constructor(private gameService: GameService) {
    this.gameService.gameStream$.subscribe(data => this.gameField = data);
  }

  ngOnInit() {

  }

  handleStart = () => {
    this.gameService.setGameProcess()
  }

  onUserClick = (e) => this.gameService.onUserClick(e)

  ngAfterContentChecked(): void {
    this.gameService.fieldStream$.subscribe(data => this.field = data);
    this.gameService.delayStream$.subscribe(data => this.delay = data);


    this.cellSize = 700 / this.field - 4 + 'px';
  }

}
