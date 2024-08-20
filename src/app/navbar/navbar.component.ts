import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The `NavbarComponent` provides the navigation bar functionality for the application,
 * including navigation to movies and profile views and user logout.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Creates an instance of `NavbarComponent`.
   * 
   * @param snackBar - Angular Material SnackBar service for displaying notifications.
   * @param router - Angular Router service for navigating between routes.
   */
  constructor(
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Navigates to the movies list view.
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user profile view.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user, clears local storage, displays a logout notification, 
   * and redirects to the welcome view.
   */
  public logoutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have successfully logged out', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }

}
