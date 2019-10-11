import { Injectable } from '@angular/core';
import { Score } from '../Models/Score';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preset } from '../Models/Preset';
import {ServerService} from './server.service';
import {WinnerItem} from '../Models/WinnerItem';
import {dateTime} from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private randomIndex: number;
  public score: Score = new Score(0, 0);
  public winner: string;
  private preset = new Preset(5, 1000);
  public gameField: Array<string> = Array.from({length: 25}, v => '');
  private name: string;
  private timeout: any;
  private gameLabel: string = 'Play';
  private started: boolean = false;

  private game$: BehaviorSubject<string[]> = new BehaviorSubject(this.gameField);
  public gameStream$: Observable<string[]> = this.game$.asObservable();
  private score$: BehaviorSubject<Score> = new BehaviorSubject(this.score);
  public scoreStream$: Observable<Score> = this.score$.asObservable();
  private preset$: BehaviorSubject<Preset> = new BehaviorSubject(this.preset);
  public presetStream$: Observable<Preset> = this.preset$.asObservable();
  private name$: BehaviorSubject<string> = new BehaviorSubject(this.name);
  public nameStream$: Observable<string> = this.name$.asObservable();
  private gameLabel$: BehaviorSubject<string> = new BehaviorSubject(this.gameLabel);
  public gameLabelStream$: Observable<string> = this.gameLabel$.asObservable();
  private started$: BehaviorSubject<boolean> = new BehaviorSubject(this.started);
  public startedStream$: Observable<boolean> = this.started$.asObservable();
  private winner$: BehaviorSubject<WinnerItem> = new BehaviorSubject(null);
  public winnerStream$: Observable<WinnerItem> = this.winner$.asObservable();

  constructor(private serverService: ServerService) { }

  setField = (field) => {
    clearTimeout(this.timeout);
    this.preset.field = field;
    this.preset$.next(this.preset);
    this.resetGame();
  }

  setDelay = (delay) => {
    this.preset.delay = delay;
    this.preset$.next(this.preset);
  };

  setPreset = (preset) => {
    this.setField(preset.field);
    this.setDelay(preset.delay);
  };

  setName = (name) => {
    this.name = name;
    this.name$.next(name);
  };

  setStartGame = () => {
    this.resetGame();
    this.setGameProcess();
    this.started$.next(true);
    this.gameLabel$.next('Playing');
  }

  resetGame = () => {
    const { field } = this.preset;
    const gameField = Array.from({length: field * field}, v => '');
    this.gameField = gameField;
    this.game$.next(gameField);
    const initialScore: Score = new Score(0, 0);
    this.score = initialScore;
    this.score$.next(initialScore);
  };


  setGameProcess = () => {
    const { field, delay } = this.preset;
    const size: number = field * field;
    const {computer, user} = this.score;
    if (computer <= size / 2 && user <= size / 2) {
      this.timeout = setTimeout(() => {
        const array = [...this.gameField];
        if (this.gameField[this.randomIndex] === 'current') {
          array[this.randomIndex] = 'computer';
          this.addScore('computer');
          this.score$.next(this.score)
        }
        let index = null;
        while (this.score.computer <= size / 2 || this.score.user <= size / 2) {
          index = Math.floor(Math.random() * size);
          if (this.gameField[index] === '') {
            break;
          }
        }
        array[index] = 'current';
        this.randomIndex = index;
        this.gameField = array;
        this.game$.next(this.gameField);
        this.setGameProcess();
      }, delay);
    }
  };

  onUserClick = (e) => {
    const id = Number(e.target.id);
    if (id === this.randomIndex && this.gameField[this.randomIndex] !== 'user' && !this.winner){
      let array = [...this.gameField];
      array[this.randomIndex] = 'user';
      this.gameField = array;
      this.game$.next(this.gameField);
      this.addScore('user');
      this.score$.next(this.score)
    }
  };


  setWinner = () => {
    this.started$.next(false);
    this.winner = this.score.user > this.score.computer ? (this.name ? this.name : 'User') : 'Computer';
    this.score.winner = this.winner;
    this.gameLabel$.next('Play again');
    const winner = new WinnerItem(this.winner, dateTime());
    this.serverService.setWinner(winner);
  };

  addScore = (player) => {
    const { field } = this.preset;
    const newScore = this.score[player] + 1
    this.score = {...this.score, [player]: newScore};
    if (newScore > field * field / 2) {
      clearTimeout(this.timeout);
      this.setWinner()
    }
  };


}
