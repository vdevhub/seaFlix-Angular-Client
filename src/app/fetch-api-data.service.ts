import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app

/**
 * Service for fetching and manipulating data from the API.
 * 
 * This service provides methods to interact with various endpoints of the API,
 * including user registration, login, and movie-related operations.
 * 
 * @see {@link https://movies-myflix-api-84dbf8740f2d.herokuapp.com/} The API hosted on Heroku.
 */

const apiUrl = 'https://movies-myflix-api-84dbf8740f2d.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http

  /**
   * Creates an instance of `FetchApiDataService`.
   * 
   * @param {HttpClient} http - The `HttpClient` instance to make HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
  * Registers a new user with the provided user details.
  * 
  * @param {any} userDetails - The user details for registration.
  * @returns {Observable<any>} An observable containing the response from the API.
  */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user with the provided login data.
   * 
   * @param {any} loginData - The login credentials.
   * @returns {Observable<any>} An observable containing the response from the API.
   */
  public userLogin(loginData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', loginData)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Retrieves all movies from the API.
  * 
  * @returns {Observable<any>} An observable containing the list of movies.
  */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Retrieves a movie by its title.
  * 
  * @param {string} movieTitle - The title of the movie to retrieve.
  * @returns {Observable<any>} An observable containing the movie details.
  */
  public getMovie(movieTitle: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + movieTitle, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Retrieves a director's details by their name.
  * 
  * @param {string} directorName - The name of the director to retrieve.
  * @returns {Observable<any>} An observable containing the director details.
  */
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + 'director/' + directorName, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves the genre information by genre name.
   * 
   * @param {string} genreName - The name of the genre to retrieve.
   * @returns {Observable<any>} An observable containing the genre details.
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + 'genre/', this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Retrieves a user's details by their user ID.
  * 
  * @param {string} userId - The ID of the user to retrieve.
  * @returns {Observable<any>} An observable containing the user details.
  */
  public getUser(userId: string): Observable<any> {
    // This endpoint doesn't exist in the current API
    // User was fetched from the localStorage where it was saved upon login
    // Can be called through the "edit user" with userId both in the endpoint and body
    // Or create this endpoint
    return this.http.get(apiUrl + 'users/' + userId, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves the favourite movies of a user by their user ID.
   * 
   * @param {string} userId - The ID of the user whose favourite movies are to be retrieved.
   * @returns {Observable<any>} An observable containing the list of favourite movies.
   */
  public getFavouriteMovies(userId: string): Observable<any> {
    // This endpoint doesn't exist in the current API
    // In previous project, favourite movies were only filtered from the
    // returned user object, passed from MainView, held as state in the React app
    // Either create a new endpoint or prepare a similar extraction
    return this.http.get(apiUrl + 'users/' + userId + '/movies', this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Adds a movie to a user's list of favourite movies.
   * 
   * @param {string} userId - The ID of the user.
   * @param {string} movieId - The ID of the movie to add to favourites.
   * @returns {Observable<any>} An observable containing the response from the API.
   */
  public addFavouriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(apiUrl + 'users/' + userId + '/' + movieId, {}, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Removes a movie from a user's list of favourite movies.
   * 
   * @param {string} userId - The ID of the user.
   * @param {string} movieId - The ID of the movie to remove from favourites.
   * @returns {Observable<any>} An observable containing the response from the API.
   */
  public removeFavouriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(apiUrl + 'users/' + userId + '/' + movieId, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Updates user details.
  * 
  * @param {string} userId - The ID of the user to update.
  * @param {any} userDetails - The details to update.
  * @returns {Observable<any>} An observable containing the updated user details.
  */
  public editUser(userId: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + 'users/' + userId, userDetails, this.getAccessToken())
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Deletes a user by their ID.
  * 
  * @param {string} userId - The ID of the user to delete.
  * @returns {Observable<any>} An observable containing the response from the API.
  */
  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + userId, {
      responseType: 'text', headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      )
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * Creates HTTP headers with the access token.
    * 
    * @private
    * @returns {Object} An object containing the HTTP headers with the authorization token.
    */
  private getAccessToken(): any {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }
  }

  /**
    * Extracts the response data from the API response.
    * 
    * @private
    * @param {Object} res - The response object from the API.
    * @returns {any} The extracted response data.
    */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
  * Handles errors from the API responses.
  * 
  * @private
  * @param {HttpErrorResponse} error - The error response object from the API.
  * @returns {Observable<never>} An observable that throws an error.
  */
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