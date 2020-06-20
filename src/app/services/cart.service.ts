import { Injectable } from '@angular/core';
import { CartItem } from '../Models/cart-item.model';
import { MovieService } from './movie.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];
  updateEvent = new Subject<void>();
  constructor(private movieService: MovieService) { }

  addToCart(movieId: string){
    const movie = this.movieService.getMovieById(movieId);
    if(movie){
      let cartItem: CartItem = {
        movieId: movieId,
        price: movie.moviePrice,
        timestamp: Date.parse(Date.now().toString())
      };
      if(!this.cart.some(c => c.movieId === movieId)){
        this.cart.push(cartItem);
        this.emitUpdateEvent();
      }
    }
  }

  emitUpdateEvent(){
    this.updateEvent.next();
  }

  contains(movieId: string): boolean{
    return this.cart.some((m) => {
      return m.movieId === movieId;
    });
  }

  removeFromCart(movieId: string){
    const index = this.cart.findIndex(m => {
      return m.movieId === movieId;
    });
    if(index != -1){
      this.cart.splice(index, 1);
      this.emitUpdateEvent();
    }
  }

}
