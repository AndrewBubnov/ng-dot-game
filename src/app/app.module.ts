import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { CellComponent } from './components/cell/cell.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { ScoreItemComponent } from './components/score-item/score-item.component';
import { SlidersComponent } from './components/sliders/sliders.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CellComponent,
    ScoreBoardComponent,
    ScoreItemComponent,
    SlidersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
