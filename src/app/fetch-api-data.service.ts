import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-myflix-api-84dbf8740f2d.herokuapp.com/'; // API URL hosted on Heroku
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(loginData: any): Observable<any> {
    console.log(loginData);
    return this.http.post(apiUrl + 'login', loginData)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the movie endpoint
  public getMovie(movieTitle: string): Observable<any> {
    console.log(movieTitle);
    return this.http.get(apiUrl + 'movies/' + movieTitle, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the movie director endpoint
  public getDirector(directorName: string): Observable<any> {
    console.log(directorName);
    return this.http.get(apiUrl + 'director/' + directorName, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the movie genre endpoint
  public getGenre(genreName: string): Observable<any> {
    console.log(genreName);
    return this.http.get(apiUrl + 'genre/', this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the user endpoint
  public getUser(userId: string): Observable<any> {
    console.log(userId);
    // This endpoint doesn't exist in the current API
    // User was fetched from the localStorage where it was saved upon login
    // Can be called through the "edit user" with userId both in the endpoint and body
    // Or create this endpoint
    return this.http.get(apiUrl + 'users/' + userId, this.getAccessToken()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the user's favourite movies endpoint
  public getFavouriteMovies(userId: string): Observable<any> {
    console.log(userId);
    // This endpoint doesn't exist in the current API
    // In previous project, favourite movies were only filtered from the
    // returned user object, passed from MainView, held as state in the React app
    // Either create a new endpoint or prepare a similar extraction
    return this.http.get(apiUrl + 'users/' + userId + '/movies/', this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call to the add favourite movie endpoint
  public addFavouriteMovie(userId: string, movieId: string): Observable<any> {
    console.log(userId);
    console.log(movieId);
    return this.http.post(apiUrl + 'users/' + userId + '/' + movieId, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call to the remove favourite movie endpoint
  public removeFavouriteMovie(userId: string, movieId: string): Observable<any> {
    console.log(userId);
    console.log(movieId);
    return this.http.delete(apiUrl + 'users/' + userId + '/' + movieId, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the user edit endpoint
  public editUser(userId: string): Observable<any> {
    console.log(userId);
    return this.http.put(apiUrl + 'users/' + userId, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the delete user endpoint
  public deleteUser(userId: string): Observable<any> {
    console.log(userId);
    return this.http.delete(apiUrl + 'users/' + userId, this.getAccessToken())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Creates HTTP header with token
  private getAccessToken(): any {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  // Handles API response errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }
}