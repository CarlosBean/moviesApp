import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: IMovie;
  searchWord: string;

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute) {
    this.movie = {} as IMovie;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchWord = params.word;
      console.log('PARAM ID', params.id);
      this.moviesService.getMovieById(params.id).subscribe(res => {
        this.movie = res;
        console.log('RESPONSE MOVIE', res);
      }, err => {
        console.log('ERROR', err);
      });
    }, err => {
      console.log('ERROR', err);
    });
  }

  goBack() {
    this.searchWord ? this.router.navigate(['search', this.searchWord]) : this.router.navigate(['home']);
  }
}
