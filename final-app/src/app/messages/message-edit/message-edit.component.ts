import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../messages.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef!: ElementRef;
  @ViewChild('msgText') msgTextRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "Cameron Fuller";

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }
  onSendMessage() {
    const msgSubject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('1', msgSubject, msgText, this.currentSender);

    this.messageService.addMessage(newMessage);
  
    this.onClear();

  }
  onClear() {

    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }


}
