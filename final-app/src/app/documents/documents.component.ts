import { Component, OnInit, Input } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {

  }



}