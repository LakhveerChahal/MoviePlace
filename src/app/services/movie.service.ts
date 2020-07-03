import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Movie } from '../Models/movie.model';
import { Genre } from '../Models/genre.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Movie[] = [];
  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<[]>('https://movieplace-97b9e.firebaseio.com/Movies.json');
  }

  getMovieById(movieId: string): Movie | null {
    const movieFound = this.movies.find(m => m.movieId === movieId);
    if (movieFound) {
      return movieFound;
    }
    return null;
  }

  getGenres() {
    return this.http.get<Genre[]>('https://movieplace-97b9e.firebaseio.com/Movies.json');
  }
}
