import { Component, OnInit, ChangeDetectorRef, Input, WritableSignal, effect } from '@angular/core';
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
  @Input() searchQuery!: WritableSignal<string>;
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  isModalOpen = false;

  constructor(private movieService: MovieService, private cdr: ChangeDetectorRef) {
    effect(() => {
      const query = this.searchQuery();
      this.filterMovies(query);
    });
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filterMovies(this.searchQuery());
      this.cdr.detectChanges();
    }, error => {
      console.error('Error loading movies:', error);
    });
  }

  filterMovies(query: string) {
    if (!query || query.trim() === '') {
      this.filteredMovies = this.movies;
    } else {
      const searchTerm = query.toLowerCase().trim();
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }
    this.cdr.detectChanges();
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
