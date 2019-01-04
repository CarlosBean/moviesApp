import { Injectable } from '@angular/core';
import { CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private API_KEY = CONFIG.API_KEY;
  private BASE_URL = CONFIG.API_URL;
  CHILDREN_MOVIES_URI: string;
  POPULAR_MOVIES_URI: string;
  ACTUAL_MOVIES_URI: string;

  constructor(private http: HttpClient) {

    this.ACTUAL_MOVIES_URI = '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22';
    this.POPULAR_MOVIES_URI = '/discover/movie?sort_by=popularity.desc';
    this.CHILDREN_MOVIES_URI = '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
  }

  getActualMovies(): Observable<any> {
    return this.http.get(`${this.BASE_URL + this.ACTUAL_MOVIES_URI}&api_key=${this.API_KEY}&language=es`)
      .pipe(map(res => res, err => err));
  }

  getPopularMovies() {
    return this.http.get(`${this.BASE_URL + this.POPULAR_MOVIES_URI}&api_key=${this.API_KEY}&language=es`)
      .pipe(map(res => res, err => err));
  }

  getChildrenMovies(): Observable<any> {
    return this.http.get(`${this.BASE_URL + this.CHILDREN_MOVIES_URI}&api_key=${this.API_KEY}&language=es`)
      .pipe(map(res => res, err => err));
  }

  getMovieById(idMovie: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/${idMovie}?api_key=${this.API_KEY}&language=es`)
      .pipe(map(res => res, err => err));
  }
}
