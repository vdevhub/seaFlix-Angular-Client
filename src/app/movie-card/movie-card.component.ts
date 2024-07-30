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
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
