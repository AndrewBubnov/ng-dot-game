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

const serverError = "Something wrong's happened with presets: "

@Component({
  selector: 'app-control-unit',
  templateUrl: './control-unit.component.html',
  styleUrls: ['./control-unit.component.css']
})
export class ControlUnitComponent implements OnInit {
  private presetsArray$: Observable<ServerPreset[]>;
  private desktop: boolean = window.innerWidth > 380;
  private startLabel: string;


  constructor(private gameService: GameService, private serverService: ServerService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.presetsArray$ = this.serverService.getPresets().pipe(
      catchError(err => {
        this.openSnackBar(err)
        return throwError(err);
      })
    );

    this.gameService.gameLabelStream$.subscribe(data => this.startLabel = data);
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

  openSnackBar = (err) => {
    const errorMessage = `${serverError}: ${err.statusText}`;
    this.snackBar.open(errorMessage, "Ok",{duration: 5000, panelClass: ['red-snackbar']})
  }

}
