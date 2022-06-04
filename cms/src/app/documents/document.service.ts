import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';


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

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  getDocuments(): Document[] {
    return this.documents.slice()
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null

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
    this.documentListChangedEvent.next(this.documents.slice());
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

    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument)
    const documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument)
        return
  
    let pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }
  
    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    const documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)
  }
  


  
}
