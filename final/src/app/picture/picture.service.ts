import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Picture } from './picture.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Picture[] = [];
  contactSelectedEvent = new EventEmitter<Picture[]>();
  contactChangedEvent = new EventEmitter<Picture[]>();
  contactListChangedEvent = new Subject<Picture[]>();
  Subject: Picture[] = [];

  maxContactId: number;


  constructor(public http: HttpClient) {
   
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Picture[] {
    this.http
      .get(
        'http://localhost:3000/contacts'
      ).subscribe({
        next: (contacts: Picture[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort();
          this.contactListChangedEvent.next([...this.contacts]);

        },
        error: (e) => console.log(e.document),
      });
    return;

  }

  getContact(id: string): Picture | null {

    return this.contacts.find((contact) => contact.id === id);

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

  addContact(contact: Picture) {
    if (!contact) {
      return;
    }


    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Picture }>('http://localhost:3000/contacts',
    contact,
      { headers: headers })
      .subscribe(
        (responseData) => {

          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Picture, newContact: Picture) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    
    newContact.id = originalContact.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Picture) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }


  sortAndSend() {
    const docList = JSON.stringify(this.contacts)
    let contactListClone = this.contacts.slice()
    this.contactListChangedEvent.next(contactListClone)

  }
  // storeContacts() {

  //   let contacts = JSON.stringify(this.contacts);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   this.http.put('https://animac-test-default-rtdb.firebaseio.com/contacts.json', contacts, { headers: headers })
  //     .subscribe(
  //       () => {
  //         this.contactListChangedEvent.next(this.contacts.slice());
  //       }
  //     )
  // }

}

