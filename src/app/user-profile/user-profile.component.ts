import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const userLS = localStorage.getItem('user') || '';
    const user = JSON.parse(userLS);
    console.log(user);
    this.userData.Username = user.Username;
    this.userData.Email = user.Email;
    this.userData.Birthday = user.Birthday.slice(0, 10);
  }

  updateAccount(): void {
    console.log(this.userData);
    const userID = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.editUser(userID, this.userData).subscribe((result) => {
      const userUpd = {
        _id: result._id,
        Username: result.Username,
        Email: result.Email,
        Birthday: result.Birthday,
        FavouriteMovies: result.FavouriteMovies
      }
      localStorage.setItem('user', JSON.stringify(userUpd));
      this.snackBar.open('Update successful!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('Update failed, make sure you enter your password in the form as well and provide at least 10 chars for your password and username and try again.', 'OK', {
        duration: 4000
      });
    });
  }

  deleteAccount(): void {
    const userID = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.deleteUser(userID).subscribe((result) => {
      this.snackBar.open('Account successfuly deleted.', 'Success', {
        duration: 2000,
      });
      this.router.navigate(['welcome']);
      localStorage.clear();
    }, (result) => {
      this.snackBar.open('Account deletion failed. Please try again later.', 'OK', {
        duration: 2000
      });
    });
  }
}
