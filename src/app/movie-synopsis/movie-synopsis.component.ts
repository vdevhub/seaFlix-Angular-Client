import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss'
})
export class MovieSynopsisComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    title: string,
    synopsis: string
  },
    public dialogRef: MatDialogRef<MovieSynopsisComponent>
  ) { }

  ngOnInit(): void { }

  closeDetail(): void {
    this.dialogRef.close();
  }
}
