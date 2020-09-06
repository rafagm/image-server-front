import { Component } from '@angular/core';
import { ImageService } from './image-service/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'imageServer';

  constructor(imageService: ImageService) {
  }
}
