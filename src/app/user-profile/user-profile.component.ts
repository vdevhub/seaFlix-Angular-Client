import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectorDetailComponent } from '../director-detail/director-detail.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreDetailComponent } from '../genre-detail/genre-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  favouriteMovies: any[] = [];
  allMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserData();
    this.getAllMovies();
  }

  getUserData(): void {
    const userLS = localStorage.getItem('user') || '';
    const user = JSON.parse(userLS);
    console.log(user);
    this.userData.Username = user.Username;
    this.userData.Email = user.Email;
    this.userData.Birthday = user.Birthday.slice(0, 10);
    this.favouriteMovies = user.FavouriteMovies || [];
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.allMovies = resp;
      this.filterFavouriteMovies();
    });
  }

  filterFavouriteMovies(): void {
    const userLS = localStorage.getItem('user') || '';
    const user = JSON.parse(userLS);
    const favouriteMovieIds = user.FavouriteMovies || [];
    this.favouriteMovies = this.allMovies.filter(movie => favouriteMovieIds.includes(movie._id));
    console.log(this.favouriteMovies);
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
      this.filterFavouriteMovies();
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

  showGenre(movie: any): void {
    this.dialog.open(GenreDetailComponent, {
      data: {
        title: String(movie.Genre.Name).toUpperCase(),
        content: movie.Genre.Description
      },
      width: "400px"
    })
  }

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

  showSynopsis(movie: any): void {
    console.log(movie.Title);
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        title: movie.Title,
        synopsis: movie.Description
      },
      width: "600px"
    })
  }
}
