import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Picture } from './library-model';

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

    addPicture(picture: Picture) {
        if (!picture) {
            return;
        }
        this.maxPictureId++;
        picture.id = this.maxPictureId.toString();

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http
            .post<{ message: String; picture: Picture }>(
                'http://localhost:3000/final/pictures/',
                picture,
                { headers: headers }
            )
            .subscribe((responseData) => {
                this.pictures.push(responseData.picture);
                let pictureClone = this.pictures.slice();
                this.pictureChanged.next(pictureClone);
            });

    }

    updatePicture(originalPicture: Picture, newPicture: Picture) {
        if (!originalPicture || !newPicture) {
            return;
        }
        const pos = this.pictures.findIndex(d => d.id === originalPicture.id)

        if (pos < 0) {
            return;
        }

        newPicture.id = originalPicture.id;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.http
            .put('http://localhost:3000/final/pictures/' + originalPicture.id, newPicture, {
                headers: headers,
            })
            .subscribe((response: Response) => {
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
        this.http.delete('http://localhost:3000/final/pictures/' + picture.id)
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
        this.pictureChanged.next(pictureListClone)

    }
}