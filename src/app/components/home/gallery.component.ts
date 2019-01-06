import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

  @Input() movies: any[];
  @Input() title: string;

  constructor() { }

  ngOnInit() {
    console.log('response component', this.movies);
  }

}
