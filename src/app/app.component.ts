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
      this.pageSize = 15;
    else
      this.pageSize = 30;
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
      });
    }, 200);
  }

  onScroll() {
    this.showSpinner = true;
    this.getALLImagesPagination(this.pageNo, this.pageSize);
  }

  openFile() {
    document.querySelector("input").click();
  }

  uploadImage(event) {
    console.log("app component");

    this.imageService.uploadImage(event);
  }
}
