import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';
import { WinnerItem } from '../../Models/WinnerItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  leaderBoard$: Observable<WinnerItem[]>;
  _id: string;

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    this.serverService.getWinnerList().subscribe(data => this.serverService.setWinnerList(data));
    this.leaderBoard$ = this.serverService.winners$;
    // this.serverService.error$.subscribe(data => console.log('Error: ', data))
  }

  onDelete = (_id) => {
    this._id = _id;
    this.serverService.deleteWinner(_id);
  }

}


