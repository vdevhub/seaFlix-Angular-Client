# SeaFlix Angular Client

SeaFlix is an Angular web application that represents a movie database where a user can register their account, browse movies and related details (synopsis, director, genre), select favourites, and update their profile.

The application leverages the [Movie API](https://movies-myflix-api-84dbf8740f2d.herokuapp.com/documentation.html) on the backend. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

The app is hosted on [GitHub Pages](https://vdevhub.github.io/seaFlix-Angular-Client/welcome).

![SeaFlixWelcome](https://github.com/user-attachments/assets/369403be-71a2-4749-8cb7-29aec7fe6e35)

![SeaFlixMovies](https://github.com/user-attachments/assets/ac72034c-a716-4d51-aca4-aef8231baf89)

## Key Features
- App should display a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user should now view all movies.
- Filtering the list of movies with a “search” feature.
- Each movie card contains title, director's name, image, and buttons to see genre, director details, and add/remove to favourites.
- User is able to delete their account.
- User is able to update their profile information.
- On their profile view, a user is able to see their favourite movies and remove them.

## Technologies
- Angular
- Angular CLI
- Angular Material
- TypeScript

## Methodologies
- Utilization of design language system (Angular)
- Application documentation in TypeDoc
- Writing in TypeScript, using directives and generics, static typing
- Using template-driven forms
- Leveraging one-way and bidirectional data bindings
- Implementing Angular routing
- Utilizing Angular CLI

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
