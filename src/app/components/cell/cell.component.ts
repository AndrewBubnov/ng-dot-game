import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input('current') current: string;
  @Input('cellSize') cellSize: string;
  @Input('id') id: number;
  background: string;


  ngOnInit() {
    if (this.current === 'current') this.background = '#6495ED';
    else if (this.current === 'computer') this.background = '#FF6040';
    else if (this.current === 'user') this.background = '#459945';
  }

}
