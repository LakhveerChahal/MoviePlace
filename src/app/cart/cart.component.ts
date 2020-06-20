import { Component, OnInit, OnDestroy } from '@angular/core';

import { MovieService } from '../services/movie.service';
import { CartService } from '../services/cart.service';
import { Movie } from '../Models/movie.model';
import { CartItem } from '../Models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  movies: Movie[] = [];
  movieOb: any;
  constructor(private cartService: CartService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.refreshCart();
  }

  onRemoveClick(movieId: string){
    this.cartService.removeFromCart(movieId); 
    this.refreshCart();
    console.log("MovieId: "+ movieId + JSON.stringify(this.movies));
  }

  refreshCart(){
    this.cart = this.cartService.cart;
    this.movieOb = this.movieService.getMovies().subscribe((data) => {
      this.movies = data.filter((m) => this.cart.some(c => c.movieId === m.movieId));
    });
  }
  ngOnDestroy(){
    this.movieOb.unsubscribe();
  }

}
