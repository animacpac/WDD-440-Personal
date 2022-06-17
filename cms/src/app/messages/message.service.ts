import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  
  constructor(public http: HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }
  getMessages():Message[]{
    this.http
      .get(
        'https://animac-test-default-rtdb.firebaseio.com/messages.json'
      ).subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messageListChangedEvent.next([...this.messages]);

        },
        error: (e) => console.log(e.document),
      });
    return;
  }
 
  addMessage(message:Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages);
  }
  getMaxId() {

    let maxId = 0;

    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

}
