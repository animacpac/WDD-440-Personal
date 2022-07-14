export class Picture {
    public id: string;
    public title: string;
    public description: string;
    public imageUrl: string;
  
    constructor(id: string, title: string, desc: string, imageUrl: string) {
      this.id = id;
      this.description = desc;
      this.imageUrl = imageUrl;
      this.title = title;
    }
  }