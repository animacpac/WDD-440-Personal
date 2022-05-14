import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, "This is a message test", "I test because I want to test", "Valter Barreto"),
    new Message(2, "Help Needed", "I will help who I help", "Jackson View"),
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
