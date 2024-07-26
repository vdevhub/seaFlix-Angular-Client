import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserSignupFormComponent } from './user-signup-form/user-signup-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'seaFlix-Angular-Client';

  constructor(public dialog: MatDialog) { }
  // Opens the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserSignupFormComponent, {
      width: '280px'
    });
  }

  // Opens the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  // Opens the movies dialog when the movies button is clicked
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}
