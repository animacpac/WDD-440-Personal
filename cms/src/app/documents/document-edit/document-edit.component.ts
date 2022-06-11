import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (!this.originalDocument) return;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }
  onCancel() {
		this.router.navigate(['/documents'], { relativeTo: this.route });
	}
  onSubmit(f: NgForm) {
    let value = f.value;
    let newDocument = new Document(value.id, value.name, value.description, value.url, null);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    
    this.router.navigateByUrl('/documents');
  }


}
