import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from '../../interfaces/movie';
import { CONFIG } from '../../app.config';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: IMovie;
  baseImg = CONFIG.IMG_URL;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
    this.movie = {} as IMovie;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
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
}
