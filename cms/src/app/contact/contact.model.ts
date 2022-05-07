export class Contact{
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public group: string;
    public imageUrl: string;

    constructor(id: string,name: string, email: string, phone: string, group: string, imageUrl: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group;
        this.imageUrl = imageUrl;
    }
}