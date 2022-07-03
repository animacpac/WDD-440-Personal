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
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }
  getMessages():Message[]{
    this.http
      .get(
        'http://localhost:3000/messages'
      ).subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messageListChangedEvent.next([...this.messages]);

        },
        error: (e) => console.log(e.message),
      });
    return;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }


    newMessage.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, newMessage: Message }>('http://localhost:3000/messages',
    newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {

          this.messages.push(responseData.newMessage);
          this.sortAndSend();
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    
    newMessage.id = originalMessage.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
    newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        }
      );
  }

  deleteMessage(message: Message) {

    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

 
  // addMessage(newMessage:Message){
  //   if (!newMessage) {
  //     return;
  //   }

  //   this.maxMessageId++;
  //   newMessage.id = this.maxMessageId.toString();
  //   this.messages.push(newMessage)

    
  //   this.storeMessages();
  // }
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

  sortAndSend() {
    const docList = JSON.stringify(this.messages)
    let messageListClone = this.messages.slice()
    this.messageListChangedEvent.next(messageListClone)

  }
  // storeMessages() {
  //   let messages = JSON.stringify(this.messages);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //    this.http.put('https://animac-test-default-rtdb.firebaseio.com/messages.json', messages, { headers: headers })
  //     .subscribe(
  //       () => {
  //         this.messageListChangedEvent.next(this.messages.slice());
  //       }
  //     )
  // }

}
