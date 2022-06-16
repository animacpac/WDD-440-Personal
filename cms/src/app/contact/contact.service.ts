import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  Subject: Contact[] = [];

  maxContactId: number;


  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  


  getContact(id: string): Contact | null{
    
    return this.contacts.find((contact) => contact.id === id);
       
   }
   deleteDocument(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    };
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

   getMaxId() {

    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }


   addContact(newContact: Contact){

    if (!newContact) {
      return;
    }
     
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact)
    const contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(contactsListClone)
   }

   updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact)
        return;
  
    let pos = this.contacts.indexOf(originalContact)
    if(pos < 0){
      return;
    }
  
    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    const documentsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(documentsListClone)
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

