import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject, Subscription } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  // contactSelectedEvent = new EventEmitter<Contact>();
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  getDocuments(): Document[] {

    this.http
      .get(
        'https://wdd430-cms-a12cc-default-rtdb.firebaseio.com/documents.json'
      ).subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a: Document, b: Document) => {
            if (a.name === b.name) {
              return 0;
            }
            return a.name > b.name ? 1 : -1;
          });
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );

    return this.documents.slice();

  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null

  }


  getMaxId() {

    let maxId = 0;

    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {

    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument)
    let documentsListClone = [...this.documents];
    this.documentListChangedEvent.next(documentsListClone)
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    let documentsListClone = [...this.documents];
    this.documentListChangedEvent.next(documentsListClone)
  }
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    };
    this.http
      .delete('https://wdd430-cms-a12cc-default-rtdb.firebaseio.com/documents.json' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      });

    this.documents.splice(pos, 1);

    let documentsListClone = [...this.documents];
    this.documentListChangedEvent.next(documentsListClone);
  }
  storeDocuments() {
    const docArray: string = JSON.stringify(this.documents);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://wdd430-cms-a12cc-default-rtdb.firebaseio.com/documents.json',
        docArray,
        {
          headers: headers,
        }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}





