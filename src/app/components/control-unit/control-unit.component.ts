import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ServerService } from '../../services/server.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";



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
  public presetsArray$: Observable<ServerPreset[]>;
  public startLabel: Observable<string>;
  public started: boolean = false;
  public desktop: boolean = window.innerWidth > 380;

  constructor(private gameService: GameService, private serverService: ServerService) { }

  ngOnInit() {
    this.presetsArray$ = this.serverService.getPresets();
    this.startLabel = this.gameService.gameLabel$;
    this.gameService.started$.subscribe(data => this.started = data);
  }

  handlePreset = (preset) => (this.gameService.setPreset(preset));


  handleStart = () => (this.gameService.setStartGame());


  handleInput = (value) => (this.gameService.setName(value));

}
