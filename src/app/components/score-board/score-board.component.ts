import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Score } from '../../Models/Score';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  public score: Score;
  public name: string;
  constructor(private gameService: GameService) {
    this.gameService.score$.subscribe(data => this.score = data);
    this.gameService.name$.subscribe(data => this.name = data);
  }
}
