import { Component } from '@angular/core';
import { UserSignupFormComponent } from './user-signup-form/user-signup-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'seaFlix-Angular-Client';

  constructor(public dialog: MatDialog) { }
  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserSignupFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }
}
