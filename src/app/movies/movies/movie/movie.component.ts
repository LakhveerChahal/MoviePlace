import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../Models/movie.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input('movie')movie: Movie;
  isPresentInCart: boolean = false;
  constructor(private route: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.checkCart();
  }

  movieDetail(){
    this.route.navigate(['movie', this.movie.movieId]);
  }

  addToCart(){
    this.cartService.addToCart(this.movie.movieId);
    this.isPresentInCart = true;
    event.stopPropagation();
  }

  checkCart(){
    this.isPresentInCart = this.cartService.contains(this.movie.movieId);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.movie.movieId);
    this.isPresentInCart = false;
    event.stopPropagation();
  }
}
