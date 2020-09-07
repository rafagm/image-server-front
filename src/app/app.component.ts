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
    this.getALLImagesPagination(0, 2,);
  }

  getALLImages() {
    this.imageService
      .getAllImages()
      .subscribe((images: Image[]) => (this.images = images));
  }

  getALLImagesPagination(pageNo?, pageSize?, sortBy?) {
    this.imageService
      .getAllImagesPagination(pageNo, pageSize, sortBy)
      .subscribe((images: Image[]) => (this.images = images));
  }

  openFile() {
    document.querySelector("input").click();
  }

  uploadImage(event) {
    console.log("app component");

    this.imageService.uploadImage(event);
  }
}
