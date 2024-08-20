import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserSignupFormComponent } from '../user-signup-form/user-signup-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * The `WelcomePageComponent` is the landing page of the application.
 * It provides options for users to either sign up or log in by opening corresponding dialog forms.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of `WelcomePageComponent`.
   * 
   * @param dialog - Angular Material Dialog service for opening dialogs for user registration and login.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Currently, it does not perform any additional actions.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the dialog for user registration when the "Sign Up" button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserSignupFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the dialog for user login when the "Log In" button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
