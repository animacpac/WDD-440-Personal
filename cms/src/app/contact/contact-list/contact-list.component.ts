import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  subscription!: Subscription;
  term!: string;

  contact: Contact[] = [
    new Contact(1, 'Valter','noc@hotmail.com','1800800','byu group','https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/240390477_10158211630847653_8033938752757357158_n.jpg?_nc_cat=106&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=W-0bZERLrZ0AX9b9Di2&_nc_ht=scontent-lax3-2.xx&oh=00_AT-1h1xqpxkko284RHelHZyJ8kreca-8OYv-eTUsbk4qCg&oe=627BE714'),
    new Contact(2, 'Val','placc@hotmail.com','1-800-811','Home','https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/237727431_10158194890647653_6205458032778244529_n.jpg?_nc_cat=108&ccb=1-6&_nc_sid=730e14&_nc_ohc=PArN0JrmvJQAX93txNI&_nc_oc=AQkZ6jtjX1POkuCSyQGkpa5CMozVdMB714yxAO4YiBGbqONfTSsLeR8raIF4ixd3pDU&_nc_ht=scontent-lax3-1.xx&oh=00_AT-3LkE1P4BGtWTMzDYdJUwJQgQGt8aQLxhrM5dApgB4zg&oe=627BDA93')
    
  ];

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }

  onContactSelected(contact: Contact){
    this.contactWasSelected.emit(contact);
  }

}
