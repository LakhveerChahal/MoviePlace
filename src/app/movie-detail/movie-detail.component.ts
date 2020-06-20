import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../services/movie.service';
import { Movie } from '../Models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: string;
  movieFound: Movie;
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getId();
    this.getMovieById(this.movieId);
  }

  getMovieById(movieId: string){
    this.movieFound = this.movieService.getMovieById(movieId);
  }
  
  getId(){
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      console.log(this.movieId);
    });
  }

}
