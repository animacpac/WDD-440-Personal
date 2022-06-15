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
  id?: string;
  invalidContact = false;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) return;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.contact?.group && this.contact?.group?.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      this.invalidContact = false;
      return;
    }
    this.invalidContact = true;
    this.groupContacts.push(selectedContact);
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    } 
    for(let contactItem of this.groupContacts){
      if(newContact.id === contactItem.id){
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



