import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  @Input() movie!:  Movie;
  @Output() movieClick = new EventEmitter<Movie>();

  onCardClick() {
    this.movieClick.emit(this.movie);
  }
}
