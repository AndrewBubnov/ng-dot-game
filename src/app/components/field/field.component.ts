import { Component, AfterContentChecked } from '@angular/core';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';

const width: number = window.innerWidth < 380 ? window.innerWidth * .98 : 700;

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements AfterContentChecked {
  public field: number;
  public cellSize: string;
  public gameField$: Observable<string[]>
  public side: string = width + 'px';

  constructor(private gameService: GameService) {
    this.gameField$ = this.gameService.game$;
  }


  onUserClick = (e) => this.gameService.onUserClick(e);

  ngAfterContentChecked(): void {
    this.gameService.preset$.subscribe(data => {
      this.field = data.field;
    });
    this.cellSize = width / this.field - 4 + 'px';
  }


}
