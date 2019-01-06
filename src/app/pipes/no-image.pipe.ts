import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(movie: any, width: string): string {

    let imgPath = 'assets/img/noimage.png';

    if (movie.poster_path) {
      imgPath = environment.img_url + '/w' + width + movie.poster_path;
    } else if (movie.backdrop_path) {
      imgPath = environment.img_url + '/w' + width + movie.backdrop_path;
    }

    return imgPath;
  }
}
