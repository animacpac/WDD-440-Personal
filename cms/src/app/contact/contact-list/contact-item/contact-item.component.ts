import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContactService } from '../../contact.service';

import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  // @Output() contactSelected = new EventEmitter<void>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSelected() {
    this.contactService.contactSelectedEvent.emit(this.contact);
  }

}
