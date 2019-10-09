import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ServerService } from '../../services/server.service';



interface ServerPreset {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control-unit',
  templateUrl: './control-unit.component.html',
  styleUrls: ['./control-unit.component.css']
})
export class ControlUnitComponent implements OnInit {
  private presetsArray: ServerPreset[];
  private desktop: boolean = window.innerWidth > 380;

  constructor(private gameService: GameService, private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getPresets().subscribe(data => {
      this.presetsArray = Object.entries(data).map(entry => ({value: entry[1], viewValue: entry[0]}))
    })
  }

  handlePreset = (preset) => {
    this.gameService.setPreset(preset)
  };


  handleStart = () => {

    this.gameService.setGameProcess()
  }

  handleInput = (value) => {
    this.gameService.setName(value);
  }

}
