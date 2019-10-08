import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  private field: number;
  private delay: number;
  private cellSize: string;
  public gameField: Array<string>

  constructor(private gameService: GameService) {
    this.gameService.gameStream$.subscribe(data => this.gameField = data);
  }

  ngOnInit() {
    const {field, delay} = this.gameService.getPreset()
    this.field = field;
    this.delay = delay;
    this.cellSize = 700 / field - 4 + 'px';
  }

  handleStart = () => {
    this.gameService.setGameProcess()
  }

  onUserClick = (e) => this.gameService.onUserClick(e)

}
