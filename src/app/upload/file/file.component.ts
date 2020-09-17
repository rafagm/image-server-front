import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input()
  fileName = "unnamed";
  @Input()
  fileError = false;
  @Input()
  percentage = 0;

  constructor() { }

  ngOnInit() {
  }

}
