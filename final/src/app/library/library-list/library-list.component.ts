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

  constructor(private libraryService: LibraryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pictures = this.libraryService.getPictures();
    this.libraryService.pictureChanged.subscribe((newPictures: Picture[]) => {
      this.pictures = newPictures;
    });
    this.subscription = this.libraryService.pictureChanged.subscribe(
      (pictureDisplay: Picture[]) => {
        this.pictures = pictureDisplay;
      }
    );
  }
  onNewPicture(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
