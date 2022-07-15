import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Picture } from '../library-model';
import { LibraryService } from '../library-service';


@Component({
  selector: 'app-library-edit',
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.css']
})
export class LibraryEditComponent implements OnInit {
  originalPicture!: Picture;
  picture!: Picture;
  
  editMode: boolean = false;
  id?: string;
  invalidPicture = false;

  constructor(private libraryService: LibraryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalPicture = this.libraryService.getPicture(this.id);
      if (!this.originalPicture) return;
      this.editMode = true;
      this.picture = JSON.parse(JSON.stringify(this.originalPicture));

    });
  }


  onSubmit(f: NgForm) {
    let value = f.value;
    let newPicture = new Picture(value.id,value.title, value.description, value.imageUrl );

    if (this.editMode) {
      this.libraryService.updatePicture(this.originalPicture, newPicture);
    } else {
      this.libraryService.addPicture(newPicture);
    }

    this.router.navigateByUrl('/picture');
  }

  onCancel() {
    this.router.navigate(['/picture'], { relativeTo: this.route });
  }

}
