import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServerPresets } from '../Models/ServerPresets';
import {catchError, map} from 'rxjs/operators';
import {WinnerItem} from '../Models/WinnerItem';
import {BehaviorSubject, Observable, throwError} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const presetUrl = 'https://dot-game-api.herokuapp.com/api/presets';
const winnerUrl = 'https://dot-game-api.herokuapp.com/api/winner';
const deleteUrl = 'https://dot-game-api.herokuapp.com/api/delete';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private winnerList: WinnerItem[] = [];
  public winners$: BehaviorSubject<WinnerItem[]> = new BehaviorSubject(this.winnerList);
  public error$: BehaviorSubject<string> = new BehaviorSubject(null);


  constructor(private http: HttpClient) { }

  getPresets = () => {
    return this.http.get<ServerPresets>(presetUrl)
      .pipe(
        map(data => Object.entries(data)),
        map(data => data.map(entry => ({value: entry[1], viewValue: entry[0].slice(0, -4) + ' mode'}))),
        catchError(err => {
          const errorMessage = err.message || err.text
          this.error$.next(errorMessage);
          return throwError(err);
        })
      );
  };

  getWinnerList = (): Observable<WinnerItem[]> => {
    return this.http.get<WinnerItem[]>(winnerUrl)
      .pipe(
        catchError(err => {
          const errorMessage = err.message || err.text
          this.error$.next(errorMessage);
          return throwError(err);
        })
      )
  };


  setWinnerList = (winnerList: WinnerItem[]): void => {
    this.winnerList = winnerList;
    this.winners$.next(this.winnerList);
  };

  setWinner = (winner) => {
    return this.http.post<WinnerItem>(winnerUrl, winner, httpOptions)
      .pipe(
        catchError(err => {
          const errorMessage = err.message || err.text
          this.error$.next(errorMessage);
          return throwError(err);
        })
      )
      .subscribe(data => {
        this.winnerList.push(data);
        this.winners$.next(this.winnerList);
      })
  };


  deleteWinner = (_id) => {
    return this.http.delete<WinnerItem>(`${deleteUrl}/${_id}`)
      .pipe(
        catchError(err => {
          const errorMessage = err.message || err.text
          this.error$.next(errorMessage);
          return throwError(err);
        })
      )
      .subscribe(data => {
      this.winnerList = this.winnerList.filter(item => item._id !== data._id);
      this.winners$.next(this.winnerList);
    })
  }

}
