import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryService } from '../library-service';
import { Picture } from '../library-model';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {

  pictures: Picture[];
  subscription: Subscription;
  term!: string;

  constructor(private libraryService: LibraryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.libraryService.pictureChanged
      .subscribe((pictures: Picture[]) => {
        this.pictures = pictures;
      })
    this.libraryService.getPictures();
  }

  onNewPicture() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }

}
