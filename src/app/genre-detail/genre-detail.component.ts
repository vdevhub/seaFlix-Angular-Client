import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrl: './genre-detail.component.scss'
})
export class GenreDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    title: string,
    content: string
  },
    public dialogRef: MatDialogRef<GenreDetailComponent>
  ) { }

  ngOnInit(): void { }

  closeDetail(): void {
    this.dialogRef.close();
  }
}