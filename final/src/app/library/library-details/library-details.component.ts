import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryService } from '../library-service';
import { Picture } from '../library-model';

@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.css']
})
export class LibraryDetailsComponent implements OnInit {
  picture: Picture;
  id: number;
  subscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.picture = this.libraryService.getPicture(this.id);
    });
    this.libraryService.pictureChanged.subscribe((newPictures: Picture[]) => {
      this.picture = newPictures[this.id];
    });
    this.subscription = this.libraryService.pictureChanged.subscribe(
      (pictureItem: Picture[]) => {
        this.picture = pictureItem[this.id];
      }
    );
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.libraryService.deletePicture(this.id);
    this.router.navigate(['/pictures']);
  }

}
