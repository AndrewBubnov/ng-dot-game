import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';
import {WinnerItem} from '../../Models/WinnerItem';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  leaderBoard$: Observable<WinnerItem[]>;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.leaderBoard$ = this.serverService.getWinnerList()
  }

}
