import { Component, OnInit, Input } from '@angular/core';
import { Image } from './image.model';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeInAnimation } from './animations/animation';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [fadeInAnimation]
})
export class ImageComponent implements OnInit {
  @Input()
  images: Image[];

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  imageUrl(imageUrl: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64, ${imageUrl}`);
  }

  imageObject(imageUrl: string) {
    return {'background-image': this.imageUrl(imageUrl)};
  }

  trackImage(index, image) {

  }

}
