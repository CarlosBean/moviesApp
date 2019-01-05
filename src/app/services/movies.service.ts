import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getUrl(uri: string): Observable<any> {
    const URL = `${environment.api_url + uri}&api_key=${environment.api_key}&language=es`;
    return this.http.get(URL);
  }

  getActualMovies(): Observable<any> {
    // last month ago date
    const monthsAgo = this.substractMonths(1, new Date());

    const gteDate = this.formatDate(monthsAgo);
    const lteDate = this.formatDate(new Date());

    return this.http.get(`/discover/movie?primary_release_date.gte=${gteDate}&primary_release_date.lte=${lteDate}`)
      .pipe(map(res => res, err => err));
  }

  getPopularMovies() {
    return this.getUrl('/discover/movie?sort_by=popularity.desc')
      .pipe(map(res => res, err => err));
  }

  getChildrenMovies(): Observable<any> {
    return this.getUrl('/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc')
      .pipe(map(res => res, err => err));
  }

  getMovieById(idMovie: number): Observable<any> {
    return this.getUrl(`/movie/${idMovie}?`).pipe(map(res => res, err => err));
  }

  getMovieByWord(word: string): Observable<any> {
    return this.getUrl(`/search/movie?query=${word}&page=1&include_adult=false`)
      .pipe(map(res => res['results']));
  }

  substractMonths(numMonths: number, minuend: Date): Date {
    let years = 0;

    if (numMonths === 0) {
      return minuend;
    }

    if (numMonths >= 12) {
      years = Math.round(numMonths / 12);
      numMonths = numMonths % 12;
    }

    const month = minuend.getMonth() === 0 ? 12 - numMonths : minuend.getMonth() - numMonths;
    const year = years > 0 ? minuend.getFullYear() - years : minuend.getFullYear();

    minuend.setMonth(month);
    minuend.setFullYear(year);

    return minuend;
  }

  formatDate(date: Date): string {
    return `${date.getFullYear}-${date.getMonth}-${date.getDay}`;
  }
}
