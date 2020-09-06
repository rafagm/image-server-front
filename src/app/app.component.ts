import { Component } from "@angular/core";
import { ImageService } from "./image/image.service";
import { Image } from "./image/image.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Image server";
  images: Image[];

  constructor(private imageService: ImageService) {
    this.getALLImages();
  }

  getALLImages() {
    this.imageService
      .getAllImages()
      .subscribe((images: Image[]) => (this.images = images));
  }
}
