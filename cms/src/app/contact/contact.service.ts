import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null{
    return this.contacts.find((contact) => contact.id === id);
    // for (let i = 0; i < this.contacts.length; i++) {
    //   if(this.contacts[i].id == id){
    //     return this.contacts[i];
    //   }
      
    // }
    // return null;
       
   }
   deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
 }
}

