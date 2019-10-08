import { Injectable } from '@angular/core';
import { Score } from '../Models/Score';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preset } from '../Models/Preset';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private randomIndex: number;
  public score: Score = new Score(0, 0);
  winner: string;
  private field = 5;
  private delay = 1000;
  public gameField: Array<string> = Array.from({length: this.field * this.field}, v => '');
  private game$: BehaviorSubject<string[]> = new BehaviorSubject(this.gameField);
  public gameStream$: Observable<string[]> = this.game$.asObservable();
  private score$: BehaviorSubject<Score> = new BehaviorSubject(this.score);
  public scoreStream$: Observable<Score> = this.score$.asObservable();
  private field$: BehaviorSubject<number> = new BehaviorSubject(this.field);
  public fieldStream$: Observable<number> = this.field$.asObservable();
  private delay$: BehaviorSubject<number> = new BehaviorSubject(this.delay);
  public delayStream$: Observable<number> = this.delay$.asObservable();


  setField = (field) => {
    this.field = field;
    this.field$.next(field);
    const gameField = Array.from({length: this.field * this.field}, v => '');
    this.gameField = gameField;
    this.game$.next(gameField);
  }

  setDelay = (delay) => {
    this.delay = delay;
    this.delay$.next(delay);
  }


  setGameProcess = () => {
    const size: number = this.field * this.field;
    const {computer, user} = this.score;
    if (computer <= size / 2 && user <= size / 2) {
      setTimeout(() => {
        const array = [...this.gameField]
        if (this.gameField[this.randomIndex] === 'current') {
          array[this.randomIndex] = 'computer';
          this.addScore('computer')
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
        this.game$.next(this.gameField)
        this.setGameProcess();
      }, this.delay);
    }
  };

  onUserClick = (e) => {
    const id = Number(e.target.id)
    if (id === this.randomIndex && this.gameField[this.randomIndex] !== 'user' && !this.winner){
      let array = [...this.gameField];
      array[this.randomIndex] = 'user';
      this.gameField = array;
      this.addScore('user')
      this.score$.next(this.score)
    }
  }

  setWinner = () => {
    this.winner = this.score.user > this.score.computer ? 'User' : 'Computer';
    this.score.winner = this.winner
  };

  addScore = (player) => {
    const newScore = this.score[player] + 1
    this.score = {...this.score, [player]: newScore}
    if (newScore > this.field * this.field / 2) {
      this.setWinner()
    }
  }

  constructor() { }
}
