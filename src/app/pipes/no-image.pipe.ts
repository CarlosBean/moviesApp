import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(image: string, width: string): string {

    let imgPath = 'assets/img/noimage.png';

    if (image) {
      imgPath = environment.img_url + '/w' + width + image;
    }

    return imgPath;
  }
}
