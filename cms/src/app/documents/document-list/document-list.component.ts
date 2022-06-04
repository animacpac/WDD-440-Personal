import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})


export class DocumentListComponent implements OnInit {
  // @Output()  selectedDocumentEvent = new EventEmitter<Document>();
  subscription!: Subscription;
  document: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.document = this.documentService.getDocuments();
    this.documentService.documentSelectedEvent
    .subscribe(
      (document: Document[]) => {
        this.document = document;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 

}
