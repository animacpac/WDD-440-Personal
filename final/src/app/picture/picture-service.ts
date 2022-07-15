import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Picture } from '../library/library-model';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    private pictures: Picture[] = [];
    pictureChanged = new Subject<Picture[]>();
    maxPictureId: number;

    constructor(private http: HttpClient) {
        this.maxPictureId = this.getMaxId();
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
        this.http
            .get(
                'http://localhost:3000/final/pictures'
            ).subscribe({
                next: (pictures: Picture[]) => {
                    this.pictures = pictures;
                    this.maxPictureId = this.getMaxId();
                    this.pictures.sort();
                    this.pictureChanged.next([...this.pictures]);

                },
                error: (e) => console.log(e.document),
            });
        return;
    }

    getPicture(id: string): Picture | null {
        return this.pictures.find((picture) => picture.id === id);
    }

    
    

    

    sortAndSend() {
        const docList = JSON.stringify(this.pictures)
        let pictureListClone = this.pictures.slice()
        this.pictureChanged.next(pictureListClone)

    }
}