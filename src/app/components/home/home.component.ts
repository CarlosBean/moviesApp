import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { IMovie } from '../../interfaces/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  childrenMovies: IMovie[];
  actualMovies: IMovie[];
  popularMovies: IMovie[];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.moviesService.getActualMovies().subscribe(res => {
      this.actualMovies = res;
      console.log('RESPONSE', res);
    }, err => {
      console.log('ERROR', err);
    });

    this.moviesService.getPopularMovies().subscribe(res => {
      this.popularMovies = res;
      console.log('RESPONSE', res);
    }, err => {
      console.log('ERROR', err);
    });

    this.moviesService.getChildrenMovies().subscribe(res => {
      this.childrenMovies = res;
      console.log('RESPONSE', res);
    }, err => {
      console.log('ERROR', err);
    });
  }

  goToMovie(idMovie: number): void {
    console.log('idMovie', idMovie);
    this.router.navigate(['movie', idMovie]);
  }

}
