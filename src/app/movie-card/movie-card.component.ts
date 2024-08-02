import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDetailComponent } from '../genre-detail/genre-detail.component';
import { DirectorDetailComponent } from '../director-detail/director-detail.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  currentUser: any;
  filteredMovies: any[] = [];
  searchQuery: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.loadUser();
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      movie.Director?.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      movie.Genre?.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      movie.Genre?.Description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = resp;
      return this.movies;
    });
  }

  loadUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  saveUser(): void {
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  isFavourite(movie: any): boolean {
    return this.currentUser.FavouriteMovies.includes(movie._id);
  }

  toggleFavourite(movie: any): void {
    const userId = this.currentUser._id;
    const index = this.currentUser.FavouriteMovies.indexOf(movie._id);
    if (index >= 0) {
      // Remove from favourites
      this.fetchApiData.removeFavouriteMovie(userId, movie._id).subscribe((resp: any) => {
        this.currentUser.FavouriteMovies.splice(index, 1);
        this.saveUser();
      }, (error: any) => {
        console.error('Error removing favourite movie:', error);
      });
    } else {
      // Add to favourites
      this.fetchApiData.addFavouriteMovie(userId, movie._id).subscribe((resp: any) => {
        this.currentUser.FavouriteMovies.push(movie._id);
        this.saveUser();
      }, (error: any) => {
        console.error('Error adding favourite movie:', error);
      });
    }
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
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        title: movie.Title,
        synopsis: movie.Description
      },
      width: "600px"
    })
  }

  addFavourite(movie: any): void {
    const userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.addFavouriteMovie(userId, movie._id).subscribe((resp: any) => {
      // To be implemented
    });
  }

  removeFavourite(movie: any): void {
    const userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.removeFavouriteMovie(userId, movie._id).subscribe((resp: any) => {
      // To be implemented
    });
  }

}
