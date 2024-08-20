import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * The `MovieSynopsisComponent` is responsible for displaying the synopsis of a movie.
 * It is presented in a dialog when a user selects a movie to view its details.
 */
@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss'
})
export class MovieSynopsisComponent implements OnInit {
  /**
   * Creates an instance of `MovieSynopsisComponent`.
   * 
   * @param data - Data passed to the component, containing the movie title and synopsis.
   * @param dialogRef - Reference to the dialog containing this component, used to close the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    title: string,
    synopsis: string
  },
    public dialogRef: MatDialogRef<MovieSynopsisComponent>
  ) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   */
  ngOnInit(): void { }

  /**
   * Closes the movie synopsis dialog.
   */
  closeDetail(): void {
    this.dialogRef.close();
  }
}
