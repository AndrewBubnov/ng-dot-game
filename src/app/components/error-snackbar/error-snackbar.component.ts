import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.css']
})
export class ErrorSnackbarComponent implements OnInit {

  constructor(private serverService: ServerService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  this.serverService.error$
    .subscribe(data => {
      if (data) {
        this.snackBar.open(data, "Ok",{duration: 5000, panelClass: ['red-snackbar']})
      }
    })
  }
}
