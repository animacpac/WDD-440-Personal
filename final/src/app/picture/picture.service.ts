import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Picture } from './picture.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  pictures: Picture[] = [];
  pictureSelectedEvent = new EventEmitter<Picture[]>();
  pictureChangedEvent = new EventEmitter<Picture[]>();
  pictureListChangedEvent = new Subject<Picture[]>();
  Subject: Picture[] = [];

  maxPictureId: number;


  constructor(public http: HttpClient) {
   
    this.maxPictureId = this.getMaxId();
  }

  getPictures(): Picture[] {
    this.http
      .get(
        'http://localhost:3000/pictures'
      ).subscribe({
        next: (pictures: Picture[]) => {
          this.pictures = pictures;
          this.maxPictureId = this.getMaxId();
          this.pictures.sort();
          this.pictureListChangedEvent.next([...this.pictures]);

        },
        error: (e) => console.log(e.picture),
      });
    return;

  }

  getPicture(id: string): Picture | null {

    return this.pictures.find((picture) => picture.id === id);

  }

  getMaxId() {

    let maxId = 0;

    for (const picture of this.pictures) {
      const currentId = +picture.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addPicture(picture: Picture) {
    if (!picture) {
      return;
    }


    picture.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, picture: Picture }>('http://localhost:3000/pictures',
    picture,
      { headers: headers })
      .subscribe(
        (responseData) => {

          this.pictures.push(responseData.picture);
          this.sortAndSend();
        }
      );
  }

  updatePicture(originalPicture: Picture, newPicture: Picture) {
    if (!originalPicture || !newPicture) {
      return;
    }

    const pos = this.pictures.findIndex(d => d.id === originalPicture.id);

    if (pos < 0) {
      return;
    }

    
    newPicture.id = originalPicture.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/pictures' + originalPicture.id,
    newPicture, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.pictures[pos] = newPicture;
          this.sortAndSend();
        }
      );
  }

  deletePicture(picture: Picture) {

    if (!picture) {
      return;
    }

    const pos = this.pictures.findIndex(d => d.id === picture.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/pictures' + picture.id)
      .subscribe(
        (response: Response) => {
          this.pictures.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }


  sortAndSend() {
    const docList = JSON.stringify(this.pictures)
    let pictureListClone = this.pictures.slice()
    this.pictureListChangedEvent.next(pictureListClone)

  }

}

