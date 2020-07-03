import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  isLoading = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(){
    this.isLoading = true;
    this.movieService.getMovies().subscribe((res: any) => {
      const fetchedMovies: Movie[] = [];
      res.forEach((m: any, i) => {
        let movie: Movie = {
          movieId: i,
          movieName: m.movieName,
          moviePrice: m.moviePrice,
          movieGenres: [],
          movieImgUrl: ''
        };
        m.genres.forEach((gId: any) => {
          movie.movieGenres.push(m.genres[gId]);
        });
        fetchedMovies.push(movie);
      });
      this.movies = fetchedMovies;
      this.isLoading = false;
    });
  }
  

}
