import { EventEmitter, Injectable } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  
  constructor() { 
    this.messages = MOCKMESSAGES;
  }
  getMessages():Message[]{
    return this.messages.slice();
  }
 
  addMessage(message:Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages);
  }

}
