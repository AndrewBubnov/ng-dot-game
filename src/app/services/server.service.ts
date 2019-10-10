import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServerPresets } from '../Models/ServerPresets';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const presetUrl = 'https://dot-game-api.herokuapp.com/api/presets'
const winnerUrl = 'https://dot-game-api.herokuapp.com/api/winner'
const deleteUrl = 'https://dot-game-api.herokuapp.com/api/delete'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }


  getPresets = () => {
    return this.http.get<ServerPresets>(presetUrl)
      .pipe(
        map(data => Object.entries(data)),
          map(data => data.map(entry => ({value: entry[1], viewValue: entry[0].slice(0, -4) + ' mode'})))
      )
  }
}
