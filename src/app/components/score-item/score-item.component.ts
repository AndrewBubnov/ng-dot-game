import { Component, AfterContentChecked, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-score-item',
  templateUrl: './score-item.component.html',
  styleUrls: ['./score-item.component.css'],
  animations: [
    trigger(
      'showUp',[
      state('new', style({transform: 'rotate3d(0, 1, 0, 90deg)'})),
      state('enter', style({transform: 'rotate3d(0, 1, 0, 0deg)'})),
        transition(
          '* => enter', [
            animate('100ms')
          ]
        )]
      )
  ]
})
export class ScoreItemComponent implements AfterContentChecked {
  @Input('data') data: number;
  inner: number;
  state: string;
  constructor() { }



  ngAfterContentChecked(): void {
    if (this.data !== this.inner){
      this.state = 'new';
      setTimeout(() => {
        this.inner = this.data;
        this.state = 'enter';
      }, 0)
    }
  }

}
