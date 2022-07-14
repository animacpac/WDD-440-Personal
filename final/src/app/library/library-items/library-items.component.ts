import { Component, OnInit, Input } from '@angular/core';
import { Picture } from '../library-model';

@Component({
  selector: 'app-library-items',
  templateUrl: './library-items.component.html',
  styleUrls: ['./library-items.component.css']
})
export class LibraryItemsComponent implements OnInit {
  @Input() picture: Picture;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
