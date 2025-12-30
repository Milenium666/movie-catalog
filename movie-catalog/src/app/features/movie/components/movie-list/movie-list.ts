import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieCard, MovieDetailModalComponent],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList implements OnInit {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  isModalOpen = false;

  constructor(private movieService: MovieService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.cdr.detectChanges();
    }, error => {
      console.error('Error loading movies:', error);
    });
  }

  onMovieClick(movie: Movie) {
    this.selectedMovie = movie;
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedMovie = null;
  }
}
