import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { CellComponent } from './components/cell/cell.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { ScoreItemComponent } from './components/score-item/score-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CellComponent,
    ScoreBoardComponent,
    ScoreItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
