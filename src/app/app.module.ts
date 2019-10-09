import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { CellComponent } from './components/cell/cell.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { ScoreItemComponent } from './components/score-item/score-item.component';
import { SlidersComponent } from './components/sliders/sliders.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { ControlUnitComponent } from './components/control-unit/control-unit.component';
import { FieldContainerComponent } from './components/field-container/field-container.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CellComponent,
    ScoreBoardComponent,
    ScoreItemComponent,
    SlidersComponent,
    LeaderBoardComponent,
    ControlUnitComponent,
    FieldContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
