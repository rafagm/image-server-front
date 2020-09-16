import { Component } from "@angular/core";
import { ImageService } from "./image/image.service";
import { Image } from "./image/image.model";
import { NgwWowService } from "ngx-wow";
import { Subscription } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

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

  private scrolledUp = false;
  private scrolledDownCounter = 0;
  private scrolledUpCounter = 0;

  showBottomSpinner = false;
  showTopSpinner = false;

  showRunOutOfImagesWarning = false;

  infiniteScrollDisabled = false;

  private wowSubscription: Subscription;

  constructor(
    private imageService: ImageService,
    private wowService: NgwWowService,
    private router: Router
  ) {
    this.setPageSize();
    this.getALLImagesPagination(0, this.pageSize);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.wowService.init({
          scrollContainer: '.images'
        });
      });
  }

  setPageSize() {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width; //get the screen's width

    if (width <= 475) this.pageSize = 5;
    else if (width <= 1150) this.pageSize = 10;
    else this.pageSize = 30;

    this.imagesSize = this.pageSize * 2;
  }

  getALLImages() {
    this.imageService
      .getAllImages()
      .subscribe((images: Image[]) => (this.images = images));
  }

  getALLImagesPagination(pageNo?, pageSize?, sortBy?, scrolledUp = false) {
    this.showSpinners(scrolledUp);

    if (this.scrolledUp && !scrolledUp) {
      pageNo = this.pageNo + Math.floor(this.imagesSize / this.pageSize);
      this.scrolledUp = false;
    } else if (this.scrolledDownCounter >= 2 && scrolledUp) {
      pageNo = this.pageNo - Math.floor(this.imagesSize / this.pageSize);
      this.scrolledDownCounter = 0;
    }

    if (!scrolledUp) this.scrolledUpCounter = 0;

    pageNo = Math.max(0, pageNo);

    console.log({ pageNo });

    this.imageService
      .getAllImagesPagination(pageNo, pageSize, sortBy)
      .subscribe((images: Image[]) => {
        this.hideSpinners();

        if (images.length > 0) {
          this.pageNo = pageNo;

          if (!scrolledUp) {
            this.images = this.images.concat(images);
            this.images = this.images.slice(
              Math.max(0, this.images.length - this.imagesSize)
            );
          } else {
            this.images = images.concat(this.images);
            this.images = this.images.slice(
              0,
              Math.min(this.images.length, this.imagesSize)
            );
          }
        } else {
          this.showRunOutOfImagesWarning = true;
          setTimeout(() => {
            this.showRunOutOfImagesWarning = false;
          }, 2000);
        }
      });
  }

  showSpinners(scrolledUp) {
    if (!scrolledUp) this.showBottomSpinner = true;
    else this.showTopSpinner = true;
  }

  hideSpinners() {
    this.showBottomSpinner = this.showTopSpinner = false;
  }

  onScroll() {
    this.disableInfiniteScroll();
    this.scrolledDownCounter++;
    this.getALLImagesPagination(this.pageNo + 1, this.pageSize);
  }

  onScrollUp() {
    this.disableInfiniteScroll();

    if (this.pageNo > 1 || (this.pageNo === 1 && this.scrolledUpCounter > 0)) {
      this.scrolledUp = true;
      this.getALLImagesPagination(this.pageNo - 1, this.pageSize, null, true);
    }

    this.scrolledUpCounter++;
  }

  disableInfiniteScroll() {
    this.infiniteScrollDisabled = true;

    setTimeout(() => {
      this.infiniteScrollDisabled = false;
    }, 500);
  }

  openFile() {
    document.querySelector("input").click();
  }

  uploadImage(event) {
    this.imageService.uploadImage(event);
  }

  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    this.wowSubscription.unsubscribe();
  }
}
