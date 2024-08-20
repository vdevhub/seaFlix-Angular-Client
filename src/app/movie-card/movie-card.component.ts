import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDetailComponent } from '../genre-detail/genre-detail.component';
import { DirectorDetailComponent } from '../director-detail/director-detail.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The `MovieCardComponent` is responsible for displaying a list of movies,
 * allowing users to filter through movies, view details about genres and directors,
 * and manage their favourite movies.
 */
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

  /**
  * Creates an instance of `MovieCardComponent`.
  * 
  * @param fetchApiData - Service used to fetch data from the API.
  * @param dialog - Service used to open material dialogs for displaying movie details.
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog) { }


  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * 
   * This method calls `getMovies()` to load the list of movies and `loadUser()` to retrieve the current user's data.
   */
  ngOnInit(): void {
    this.getMovies();
    this.loadUser();
  }

  /**
   * Filters the list of movies based on the user's search query.
   * 
   * The filtering is performed on the movie title, director's name, genre's name, or genre's description.
   */
  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      movie.Director?.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      movie.Genre?.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      movie.Genre?.Description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  /**
  * Fetches the list of all movies from the API.
  * 
  * The fetched movies are stored in both `movies` and `filteredMovies`.
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = resp;
      return this.movies;
    });
  }

  /**
   * Loads the current user's information from local storage.
   */
  loadUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  /**
   * Saves the current user's information to local storage.
   */
  saveUser(): void {
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  /**
   * Checks if a given movie is in the user's list of favourite movies.
   * 
   * @param movie - The movie to check.
   * @returns `true` if the movie is in the user's favourites, `false` otherwise.
   */
  isFavourite(movie: any): boolean {
    return this.currentUser.FavouriteMovies.includes(movie._id);
  }

  /**
   * Toggles the favourite status of a movie.
   * 
   * If the movie is already a favourite, it is removed from the user's favourites.
   * If the movie is not a favourite, it is added to the user's favourites.
   * 
   * @param movie - The movie to toggle as a favourite.
   */
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

  /**
   * Opens a dialog to show details about the genre of a selected movie.
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
   * Opens a dialog to show details about the director of a selected movie.
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
   * Opens a dialog to show the synopsis of a selected movie.
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

  /**
   * Adds a movie to the user's list of favourite movies.
   * 
   * @param movie - The movie to add to the favourites list.
   */
  addFavourite(movie: any): void {
    const userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.addFavouriteMovie(userId, movie._id).subscribe((resp: any) => {
      // To be implemented
    });
  }

  /**
   * Removes a movie from the user's list of favourite movies.
   * 
   * @param movie - The movie to remove from the favourites list.
   */
  removeFavourite(movie: any): void {
    const userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.fetchApiData.removeFavouriteMovie(userId, movie._id).subscribe((resp: any) => {
      // To be implemented
    });
  }

}
