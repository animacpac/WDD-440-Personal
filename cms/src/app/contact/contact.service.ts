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


  constructor(public http: HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http
      .get(
        'https://animac-test-default-rtdb.firebaseio.com/contacts.json'
      ).subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort();
          this.contactListChangedEvent.next([...this.contacts]);

        },
        error: (e) => console.log(e.document),
      });
    return;
     
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

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact)

    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
 }
 storeContacts(){

  let contacts = JSON.stringify(this.contacts);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   this.http.put('https://animac-test-default-rtdb.firebaseio.com/contacts.json', contacts, { headers: headers })
    .subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    )
}
 
}

