import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  // contactSelectedEvent = new EventEmitter<Contact>();
  documentSelectedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
  getDocuments(): Document[] {
    return this.documents.slice()
  }
  getDocument(id: string): Document | null {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id == id) {
        return this.documents[i];
      }

    }
    return null;

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
    this.documentSelectedEvent.emit(this.documents.slice());
  }
}
