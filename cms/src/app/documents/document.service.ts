import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
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

  constructor(public http: HttpClient) {
    // this.maxDocumentId = this.getMaxId();
    this.getDocuments();
  }
  getDocuments(): Document[] {
    this.http
      .get(
        'https://animac-test-default-rtdb.firebaseio.com/documents.json'
      ).subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort();
          this.documentListChangedEvent.next([...this.documents]);

        },
        error: (e) => console.log(e.document),
      });
    return;

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

    this.storeDocuments();
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
    // let documentsListClone = [...this.documents];
    // this.documentListChangedEvent.next(documentsListClone)
    this.storeDocuments();
  }
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    };
    this.documents.splice(pos, 1);

    this.storeDocuments();
  }

  storeDocuments() {
    const documentList = JSON.stringify(this.documents);
    this.http.put('https://animac-test-default-rtdb.firebaseio.com/documents.json', documentList, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }


}
