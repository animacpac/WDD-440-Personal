import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';
import { NgbdCarouselBasic } from '../contact-carousel/carousel-basic';




@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // @Output() contactWasSelected = new EventEmitter<Contact>();
  subscription!: Subscription;
  term!: string;

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });

  //get contact list
  this.contactService.getContacts();
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }
  
}
