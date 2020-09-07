import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Image } from "./image.model";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor(private http: HttpClient) {
    console.log("ImageService injected!!");
  }

  getAllImages() {
    return this.http.get(`${environment.IMAGE_API}/all`);
  }

  getAllImagesPagination(pageNo?, pageSize?, sortBy?) {
    let params = {
      pageNo,
      pageSize
    };

    if (sortBy) params["sortBy"] = sortBy;

    return this.http.get(`${environment.IMAGE_API}`, { params });
  }

  uploadImage(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      const formData: FormData = new FormData();
      formData.append("file", file);

      let headers = new HttpHeaders();

      this.http.post(`${environment.IMAGE_API}`, formData).subscribe(
        (data) => console.log("success"),
        (error) => console.log(error)
      );
    }
  }
}
