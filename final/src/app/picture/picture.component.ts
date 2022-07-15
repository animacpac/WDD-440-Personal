import { Component, Input, OnInit } from '@angular/core';
import { Picture } from '../library/library-model';


@Component({
  selector: 'app-contact',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  @Input() picture: Picture;

  images = [944, 1020, 984, 990, 1015, 941].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() { }

  ngOnInit(): void {
  }

}
