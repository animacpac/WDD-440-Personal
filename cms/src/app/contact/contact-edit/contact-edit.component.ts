import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

// import { ContactDesc } from 'src/app/shared/dropdown.directive';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

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
  lastAddSuccessful: boolean | null = null;
  
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);

        if (!this.originalContact) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          this.groupContacts = [...this.contact.group];
        }
      }
    );
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    } if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (const contact of this.groupContacts) {
      if (newContact.id === contact.id) {
        return true;
      }
    }
    return false;
  }
  
  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigateByUrl('/contacts');
  }
  onAddItem() {
    const cntName = this.nameInputRef.nativeElement.value;
    const emaildesc = this.emailInputRef.nativeElement.value;
    // const newContactDesc = new ContactDesc(cntName, emaildesc);
    // this.ContactDescAdded.emit(newContactDesc);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      this.lastAddSuccessful = false;
      return;
    }
    this.lastAddSuccessful = true;
    this.groupContacts.push(selectedContact);
  }
  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}



