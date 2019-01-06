import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { IMovie } from '../../interfaces/movie';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchWord: string;
  movies: IMovie[];

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchWord = params.word;
      this.searchMovie();
    });
  }

  searchMovie() {
    if (this.searchWord.length === 0) {
      return;
    }

    this.moviesService.getMovieByWord(this.searchWord).subscribe(data => {
      this.movies = data.slice(10);
    }, err => {
      console.log('ERROR ', err);
    });
  }

  goToMovie(idMovie) {
    this.router.navigate(['movie', idMovie, 'search', this.searchWord]);
  }

}
