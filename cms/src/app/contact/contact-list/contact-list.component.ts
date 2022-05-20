import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // @Output() contactWasSelected = new EventEmitter<Contact>();
  subscription!: Subscription;
  term!: string;

  contact: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contact = this.contactService.getContacts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }



}
