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
  images: Image[] = [];

  private pageNo = 0;
  private pageSize;

  // It always has to be bigger than pageSize.
  // It's used to prevent memory leaks because of the infinite scroll.
  private imagesSize;

  showSpinner = true;

  constructor(private imageService: ImageService) {
    this.setPageSize();
    this.getALLImagesPagination(0, this.pageSize);
  }

  setPageSize() {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width; //get the screen's width

    if (width <= 475)
      this.pageSize = 10;
    else if (width <= 1150)
      this.pageSize = 5;
    else
      this.pageSize = 30;

    this.imagesSize = this.pageSize * 2;
  }

  getALLImages() {
    this.imageService
      .getAllImages()
      .subscribe((images: Image[]) => (this.images = images));
  }

  getALLImagesPagination(pageNo?, pageSize?, sortBy?) {
    setTimeout(() => {
      this.imageService
      .getAllImagesPagination(pageNo, pageSize, sortBy)
      .subscribe((images: Image[]) => {
        this.showSpinner = false;
        this.pageNo++;

        this.images = this.images.concat(images);
        this.images = this.images.slice(Math.max(0, (this.images.length - this.imagesSize)));

      });
    }, 200);
  }

  onScroll() {
    this.showSpinner = true;
    this.getALLImagesPagination(this.pageNo, this.pageSize);
  }

  onScrollUp() {
    console.log("Scrolled Up");

  }

  openFile() {
    document.querySelector("input").click();
  }

  uploadImage(event) {
    console.log("app component");

    this.imageService.uploadImage(event);
  }
}
