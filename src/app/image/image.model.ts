export class Image {
  id?: number;
  name: string;
  type: string;
  imageBytes: string;

  constructor(name: string, type: string, imageBytes: string) {
    this.name = name;
    this.type = type;
    this.imageBytes = imageBytes;
  }
}
