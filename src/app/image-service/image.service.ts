import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService   {

  constructor(private http: HttpClientModule) {
    console.log("ImageService injected!!");

  }


}
