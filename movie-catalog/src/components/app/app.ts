import { Component, signal } from '@angular/core';
import { Header } from '../../app/shared/ui/components/header/header';
import { MovieList } from '../../app/features/movie/components/movie-list/movie-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header, MovieList],
})
export class App {
  protected readonly title = signal('movie-catalog');
}
