import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

// import { ContactDesc } from 'src/app/shared/dropdown.directive';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
    @ViewChild('nameInput', { static: false }) nameInputRef!: ElementRef;
    @ViewChild('emailInput', { static: false }) emailInputRef!: ElementRef;
    // @Output() ContactDescAdded = new EventEmitter<ContactDesc>();
  

  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
  contactInvalid: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  onAddItem() {
    const cntName = this.nameInputRef.nativeElement.value;
    const emaildesc = this.emailInputRef.nativeElement.value;
    // const newContactDesc = new ContactDesc(cntName, emaildesc);
    // this.ContactDescAdded.emit(newContactDesc);
  }


}
