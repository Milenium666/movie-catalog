import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie as MovieInterface } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private dataUrl = 'assets/data/movies.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.dataUrl);
  }
}
