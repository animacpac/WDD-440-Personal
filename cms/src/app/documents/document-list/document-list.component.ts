import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output()  selectedDocumentEvent = new EventEmitter<Document>();
  documents:Document[] = [
    new Document(1, "Valter1", "Some File", "facebook.com", "vale"),
    new Document(2, "Valter2", "Teting file", "byui.com", "Vicky"),
    new Document(3, "Valter3", "What File", "canvas.com", "vale"),
    new Document(4, "Valter4", "Vegita", "github.com", "vale"),

  ];

  constructor() { }

  ngOnInit(): void {
  }
  onSelectedDocument(document:Document){
    this.selectedDocumentEvent.emit(document)
  }

}
