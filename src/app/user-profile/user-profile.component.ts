import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectorDetailComponent } from '../director-detail/director-detail.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreDetailComponent } from '../genre-detail/genre-detail.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The `UserProfileComponent` is responsible for displaying and managing the user's profile data,
 * including updating account information, managing favorite movies, and providing options to
 * delete the account.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  /**
   * The user's profile data containing username, password, email, and birthday.
   * This data is bound to the profile form inputs.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  favouriteMovies: any[] = [];
  allMovies: any[] = [];

  /**
   * Creates an instance of `UserProfileComponent`.
   * 
   * @param fetchApiData - Service for making API calls related to user data and movies.
   * @param snackBar - Angular Material SnackBar service for displaying notifications.
   * @param router - Angular Router service for navigation.
   * @param dialog - Angular Material Dialog service for opening modal dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Fetches the user's data and the list of all movies on initialization.
   */
  ngOnInit(): void {
    this.getUserData();
    this.getAllMovies();
  }

  /**
   * Fetches the user data from localStorage and sets the `userData` and `favouriteMovies` properties.
   */
  getUserData(): void {
    const userLS = localStorage.getItem('user') || '';
    const user = JSON.parse(userLS);
    this.userData.Username = user.Username;
    this.userData.Email = user.Email;
    this.userData.Birthday = user.Birthday.slice(0, 10);
    this.favouriteMovies = user.FavouriteMovies || [];
  }

  /**
   * Fetches the list of all movies from the API and filters the user's favorite movies.
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.allMovies = resp;
      this.filterFavouriteMovies();
    });
  }

  /**
   * Filters the user's favorite movies from the list of all movies.
   */
  filterFavouriteMovies(): void {
    const userLS = localStorage.getItem('user') || '';
    const user = JSON.parse(userLS);
    const favouriteMovieIds = user.FavouriteMovies || [];
    this.favouriteMovies = this.allMovies.filter(movie => favouriteMovieIds.includes(movie._id));
  }

  /**
  * Updates the user's account information by sending the updated data to the API.
  * If successful, updates the user data in localStorage and displays a success notification.
  * If unsuccessful, displays an error notification.
  */
  updateAccount(): void {
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
      this.filterFavouriteMovies();
    }, (result) => {
      this.snackBar.open('Update failed, make sure you enter your password in the form as well and provide at least 10 chars for your password and username and try again.', 'OK', {
        duration: 4000
      });
    });
  }

  /**
   * Deletes the user's account by sending a delete request to the API.
   * If successful, clears the user data from localStorage, displays a success notification,
   * and navigates to the welcome page.
   * If unsuccessful, displays an error notification.
   */
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

  /**
   * Removes a movie from the user's favorite movies list by sending a request to the API.
   * If successful, updates the user data in localStorage and the `favouriteMovies` array.
   * 
   * @param movieId - The ID of the movie to be removed from the user's favorites.
   */
  removeFromFavourites(movieId: string): void {
    const userID = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.removeFavouriteMovie(userID, movieId).subscribe((resp: any) => {
      const userLS = localStorage.getItem('user') || '';
      const user = JSON.parse(userLS);
      user.FavouriteMovies = user.FavouriteMovies.filter((id: string) => id !== movieId);
      localStorage.setItem('user', JSON.stringify(user));
      this.favouriteMovies = this.favouriteMovies.filter(movie => movie._id !== movieId);
    }, (error: any) => {
      console.error('Error removing favourite movie:', error);
    });
  }

  /**
   * Opens a dialog to display the genre details of the selected movie.
   * 
   * @param movie - The movie whose genre details are to be displayed.
   */
  showGenre(movie: any): void {
    this.dialog.open(GenreDetailComponent, {
      data: {
        title: String(movie.Genre.Name).toUpperCase(),
        content: movie.Genre.Description
      },
      width: "400px"
    })
  }

  /**
   * Opens a dialog to display the director details of the selected movie.
   * 
   * @param movie - The movie whose director details are to be displayed.
   */
  showDirector(movie: any): void {
    this.dialog.open(DirectorDetailComponent, {
      data: {
        name: String(movie.Director.Name).toUpperCase(),
        bio: movie.Director.Bio,
        birth: movie.Director.Birth,
        death: movie.Director.Death,
      },
      width: "600px"
    })
  }

  /**
   * Opens a dialog to display the synopsis of the selected movie.
   * 
   * @param movie - The movie whose synopsis is to be displayed.
   */
  showSynopsis(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        title: movie.Title,
        synopsis: movie.Description
      },
      width: "600px"
    })
  }
}
