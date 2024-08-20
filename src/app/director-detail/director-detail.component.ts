import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying detailed information about a director.
 * 
 * This component is used within a dialog to show information about a director,
 * including their name, biography, birth date, and death date.
 */
@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrl: './director-detail.component.scss'
})
export class DirectorDetailComponent implements OnInit {
  /**
   * Creates an instance of `DirectorDetailComponent`.
   * 
   * @param {MAT_DIALOG_DATA} data - The data passed into the dialog, containing the director's details.
   * @param {MatDialogRef<DirectorDetailComponent>} dialogRef - The reference to the dialog that opened this component.
   */
  constructor(@Inject(MAT_DIALOG_DATA)
  /**
  * Data injected into the component from the dialog.
  * 
  * @type {{ name: string, bio: string, birth: string, death: string }}
  */
  public data: {
    name: string,
    bio: string,
    birth: string,
    death: string
  },
    /**
     * Reference to the dialog that opened this component.
     * 
     * @type {MatDialogRef<DirectorDetailComponent>}
     */
    public dialogRef: MatDialogRef<DirectorDetailComponent>
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