import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServerPresets } from '../Models/ServerPresets';
import {map} from 'rxjs/operators';
import {WinnerItem} from '../Models/WinnerItem';
import {BehaviorSubject, Observable} from 'rxjs';
import {IdObject} from '../Models/IdObject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// const presetUrl = 'https://dot-game-api.herokuapp.com/api/presets';
// const winnerUrl = 'https://dot-game-api.herokuapp.com/api/winner';
// const deleteUrl = 'https://dot-game-api.herokuapp.com/api/delete';

const presetUrl = 'http://localhost:5000/api/presets';
const winnerUrl = 'http://localhost:5000/api/winner';
const deleteUrl = 'http://localhost:5000/api/delete';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private winnerList: WinnerItem[] = [];

  private winners$: BehaviorSubject<WinnerItem[]> = new BehaviorSubject(this.winnerList);
  public winnersStream$: Observable<WinnerItem[]> = this.winners$.asObservable();

  constructor(private http: HttpClient) { }

  getPresets = () => {
    return this.http.get<ServerPresets>(presetUrl)
      .pipe(
        map(data => Object.entries(data)),
          map(data => data.map(entry => ({value: entry[1], viewValue: entry[0].slice(0, -4) + ' mode'})))
      )
  }

  getWinnerList = (): Observable<WinnerItem[]> => (this.http.get<WinnerItem[]>(winnerUrl));


  setWinnerList = (winnerList: WinnerItem[]): void => {
    this.winnerList = winnerList;
    this.winners$.next(this.winnerList);
  };

  setWinner = (winner) => {
    return this.http.post<WinnerItem>(winnerUrl, winner, httpOptions)
      .subscribe(data => {
        this.winnerList.push(data);
        this.winners$.next(this.winnerList);
      })
  };



  deleteWinner = (_id) => {
    return this.http.delete<WinnerItem>(`${deleteUrl}/${_id}`)
      .subscribe(data => {
      this.winnerList = this.winnerList.filter(item => item._id !== data._id);
      this.winners$.next(this.winnerList);
    })
  }

}
