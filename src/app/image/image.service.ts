import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from "@angular/common/http";
import { Image } from "./image.model";
import { UploadService } from "./upload.service";
import { map } from "rxjs/internal/operators/map";
import { last } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ImageService {
  private uploadSubscription;
  private percentage = 0;

  constructor(private http: HttpClient, private uploadService: UploadService) {
    console.log("ImageService injected!!");
  }

  getAllImages() {
    return this.http.get(`${environment.IMAGE_API}/all`);
  }

  getAllImagesPagination(pageNo?, pageSize?, sortBy?) {
    let params = {
      pageNo,
      pageSize,
    };

    if (sortBy) params["sortBy"] = sortBy;

    return this.http.get(`${environment.IMAGE_API}`, { params });
  }

  uploadImage(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      Array.from(fileList).forEach((file: File) => {
        this.showProgress();

        this.uploadSubscription = this.uploadService
          .uploadFile(file)
          .pipe(map((data) => {
            this.getEventMessage(data);
          }),
          last())
          .subscribe(
            () => {

            },
            () => {
              // on error
              this.percentage = 0;

            });
      });
    }
  }

  showProgress() {

  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.percentage = 0;  // upload percentage
        break;

      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.percentage = percentDone;
        break;

      case HttpEventType.Response:
        this.percentage = 100; // file is uploaded
    }


  }
}
