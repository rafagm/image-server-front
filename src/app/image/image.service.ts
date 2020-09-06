import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService   {

  constructor(private http: HttpClient) {
    console.log("ImageService injected!!");

  }

  getAllImages() {
    return this.http.get(`${environment.IMAGE_API}`);
  }

  uploadImage() {

  }


}
