import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// To display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The `UserLoginFormComponent` is responsible for handling the user login functionality,
 * including form submission, API calls, and navigation after successful login.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  /**
   * The user's login data containing username and password.
   * This data is bound to the login form inputs.
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * Creates an instance of `UserLoginFormComponent`.
   * 
   * @param fetchApiData - Service for making API calls related to user authentication.
   * @param dialogRef - Reference to the dialog opened with this component.
   * @param snackBar - Angular Material SnackBar service for displaying notifications.
   * @param router - Angular Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Submits the login form data to the backend via the `FetchApiDataService`.
   * On success, stores the user data and token in localStorage, closes the login dialog, 
   * displays a success notification, and navigates to the movies view.
   * On failure, displays an error notification.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)
      const user = {
        _id: result.user._id,
        Username: result.user.Username,
        Email: result.user.Email,
        Birthday: result.user.Birthday,
        FavouriteMovies: result.user.FavouriteMovies
      }
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Login successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      this.snackBar.open('Login failed, please check your credentials and try again.', 'OK', {
        duration: 2000
      });
    });
  }

}