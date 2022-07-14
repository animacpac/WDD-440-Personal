import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from './library-model';

@Pipe({
  name: 'picturesFilter'
})
export class PicturesFilterPipe implements PipeTransform {
  

  transform(pictures: Picture[], term: string): any {
    let filteredPictures: Picture[] = []
    if (term && term.length > 0){
      filteredPictures = pictures.filter((picture: Picture) => picture.title.toLowerCase().includes(term.toLowerCase()));
    }
    if (filteredPictures.length < 1) return pictures;
    return filteredPictures;
  }

}
