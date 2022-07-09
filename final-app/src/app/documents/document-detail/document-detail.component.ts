import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  id: string;
  document: Document;
  nativeWindow: any;


  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRef: WindRefService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.document = this.documentService.getDocument(id);
      }
    );
    this.nativeWindow = this.windRef.getNativeWindow();//Previous lesson told us to use in ngOnInit instead of constructor
  }
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'])
  }



}