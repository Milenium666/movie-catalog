import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.cdr.detectChanges();
    }, error => {
      console.error('Error loading movies:', error);
    });
  }
}
