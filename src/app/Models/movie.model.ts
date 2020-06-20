import { Genre } from './genre.model';

export interface Movie{
    movieId: string;
    movieName: string;
    movieGenres: Genre[];
    moviePrice: number;
    movieImgUrl: string;
}