import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../messages.model';
import { ContactService } from 'src/app/contact/contact.service';
import { Contact } from 'src/app/contact/contact.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  // @Output() messageSelected = new EventEmitter<void>();
  messageSender!: string;


  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
    
  }

}
