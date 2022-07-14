import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LibraryService } from '../library-service';
import { Picture } from '../library-model';





@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.css']
})
export class LibraryDetailsComponent implements OnInit {

  id: string;
  picture: Picture;


  constructor(private pictureService: LibraryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=> {
        this.id = params['id']
        this.picture = this.pictureService.getPicture(this.id)
      })
  }
  
  onDelete() {
    this.pictureService.deletePicture(this.picture);
    this.router.navigate(['/pictures']);
  }

}
