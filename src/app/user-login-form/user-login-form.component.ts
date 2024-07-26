import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// To display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
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