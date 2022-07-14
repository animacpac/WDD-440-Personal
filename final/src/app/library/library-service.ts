import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Picture } from './library-model';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    pictureChanged = new Subject<Picture[]>();
    private pictures: Picture[] = [];


    maxPictureId: number;

    constructor(private http: HttpClient) {
        this.maxPictureId
    }

    setPictures(newPictures: Picture[]) {
        this.pictures = newPictures;
        this.pictureChanged.next(this.pictures.slice())
    }
    getMaxId(): number {
        let maxId = 0;

        for (let picture of this.pictures) {
            let currentId = parseInt(picture.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    getPictures() {
        this.http.get('http://localhost:3000/final/pictures').subscribe(
            (pictures: Picture[]) => {

                this.pictures = pictures;
                this.maxPictureId = this.getMaxId();
                this.pictures.sort((a: Picture, b: Picture) => {
                    if (a.title === b.title) {
                        return 0;
                    }
                    return a.title > b.title ? 1 : -1;
                });
                this.pictureChanged.next(this.pictures.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );

        return this.pictures.slice();
    }

    getPicture(index: number) {
        return this.pictures[index];
    }
    addPicture(picture: Picture) {
        if (!picture) {
            return;
        }
        this.maxPictureId++;
        picture.id = this.maxPictureId.toString();

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http
            .post<{ message: String; picture: Picture }>(
                'http://localhost:3000/final/pictures',
                picture,
                { headers: headers }
            )
            .subscribe((responseData) => {
                this.pictures.push(responseData.picture);
                let pictureClone = this.pictures.slice();
                this.pictureChanged.next(pictureClone);
            });

    }
    updatePicture(index: number, newPicture: Picture) {
        if (!this.pictures[index] || !newPicture) {
          return;
        }
        newPicture.id = this.pictures[index].id;
    
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        this.http
          .put(
            'http://localhost:3000/final/pictures' + this.pictures[index].id,
            newPicture,
            { headers: headers }
          )
          .subscribe((response: Response) => {
            this.pictures[index] = newPicture;
            this.pictureChanged.next(this.pictures.slice());
            });
      }

      deletePicture(index: number) {
        if (!this.pictures[index]) {
          return;
        }
        this.http
          .delete('http://localhost:3000/final/pictures' + this.pictures[index].id)
          .subscribe((response: Response) => {
            this.pictures.splice(index, 1);
            this.pictureChanged.next(this.pictures.slice());
          });
      }





}