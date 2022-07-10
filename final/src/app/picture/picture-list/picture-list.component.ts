import { Component, OnInit } from '@angular/core';
import { PictureService } from '../picture.service';
import { Subscription } from 'rxjs';
import { Picture } from '../picture.model';


@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
  subscription!: Subscription;
  term!: string;
  pictures: Picture [];
  constructor(/*private pictureService: PictureService*/) { }

  ngOnInit(): void {
  //   this.subscription = this.pictureService.pictureListChangedEvent
  //   .subscribe((picture: Picture[]) => {
  //     this.pictures = this.pictures;
  // })
  // this.pictureService.getPictures();
}
  search(value: string) {
    this.term = value;
  }
  

}
