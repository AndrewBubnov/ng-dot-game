import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent {
  private field = 5;
  private delay = 1000;
  constructor(private gameService: GameService) { }


  onFieldChange = (e) => {
    this.gameService.setField(e.value);
  };

  onDelayChange = (e) => {
    this.gameService.setDelay(e.value);
  };


}
