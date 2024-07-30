import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrl: './director-detail.component.scss'
})
export class DirectorDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    name: string,
    bio: string,
    birth: string,
    death: string
  },
    public dialogRef: MatDialogRef<DirectorDetailComponent>
  ) { }

  ngOnInit(): void { }

  closeDetail(): void {
    this.dialogRef.close();
  }
}