import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// To display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The `UserSignupFormComponent` is responsible for handling the user registration process.
 * It provides a form for users to input their registration details and sends this data to the backend API.
 */
@Component({
  selector: 'app-user-signup-form',
  templateUrl: './user-signup-form.component.html',
  styleUrl: './user-signup-form.component.scss'
})
export class UserSignupFormComponent implements OnInit {

  /**
   * Object representing the user's registration data, including username, password, email, and birthday.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of `UserSignupFormComponent`.
   * 
   * @param fetchApiData - Service for making API calls related to user registration.
   * @param dialogRef - Reference to the dialog opened for this component, used for closing the dialog on success.
   * @param snackBar - Angular Material SnackBar service for displaying notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserSignupFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Currently, it does not perform any additional actions.
   */
  ngOnInit(): void {
  }

  /**
   * Registers the user by sending the form data to the backend API.
   * If registration is successful, the dialog is closed, and a success message is shown.
   * If registration fails, an error message is displayed.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Signup successful! You can log in now.', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('Signup unsuccessful.', 'OK', {
        duration: 2000
      });
    });
  }

}