import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying detailed information about a genre.
 * 
 * This component is used within a dialog to show information about a genre,
 * including its title and content.
 */
@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrl: './genre-detail.component.scss'
})
export class GenreDetailComponent implements OnInit {
  /**
  * Creates an instance of `GenreDetailComponent`.
  * 
  * @param {MAT_DIALOG_DATA} data - The data passed into the dialog, containing the genre's title and content.
  * @param {MatDialogRef<GenreDetailComponent>} dialogRef - The reference to the dialog that opened this component.
  */
  constructor(@Inject(MAT_DIALOG_DATA)
  /**
   * Data injected into the component from the dialog.
   * 
   * @type {{ title: string, content: string }}
   */
  public data: {
    title: string,
    content: string
  },
    /**
     * Reference to the dialog that opened this component.
     * 
     * @type {MatDialogRef<GenreDetailComponent>}
     */
    public dialogRef: MatDialogRef<GenreDetailComponent>
  ) { }

  /**
   * Angular lifecycle hook that is called after the component is initialized.
   * 
   * @method ngOnInit
   */
  ngOnInit(): void { }

  /**
  * Closes the dialog.
  * 
  * This method is called when the user wants to close the detail view.
  * 
  * @method closeDetail
  */
  closeDetail(): void {
    this.dialogRef.close();
  }
}