import { Injectable } from '@angular/core';
import { Movie } from '../Models/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Movie[] = [
    { movieId: '0', movieName: 'Avatar', movieGenres: [{ genreId: '0', genreName: 'Action' }], moviePrice: 300, 
    movieImgUrl: 'https://tse1.mm.bing.net/th?id=OIP.JhE6fUEhIE-13-TS9wj2JAAAAA&w=80&h=110&c=8&rs=1&qlt=90&pid=3.1&rm=2' },
    { movieId: '1', movieName: '13 Hours', movieGenres: [{ genreId: '0', genreName: 'Action' }], moviePrice: 400, 
    movieImgUrl: '' },
    { movieId: '2', movieName: 'Avengers', movieGenres: [{ genreId: '1', genreName: 'Sci-Fi' }], moviePrice: 200, 
    movieImgUrl: '' },
    { movieId: '3', movieName: 'Iron Man', movieGenres: [{ genreId: '0', genreName: 'Action' }], moviePrice: 150, 
    movieImgUrl: 'https://th.bing.com/th/id/OIP.hb3lIAz5RV1RiBaTq0wOYgHaLH?w=181&h=272&c=7&o=5&pid=1.7' }
  ];
  constructor() { }

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovieById(movieId: string): Movie | null {
    const movieFound = this.movies.find(m => m.movieId === movieId);
    if (movieFound) {
      return movieFound;
    }
    return null;
  }
}
