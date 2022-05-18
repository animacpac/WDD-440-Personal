import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from "rxjs";
import { Message } from "./messages.model";
import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })

export class MessageService {
    messageChangedEvent = new Subject<Message[]>();
    maxMessageId!: number;
    private message!: Message[];

    constructor(private http: HttpClient) {}
    
    getMessage(id: Number) {
        return this.message.find((m) => m.id === id);
    }
    getMaxId(): number {
    
        let maxId = 0;
        
        for (const message of this.message) {
          const currentId = +message.id;
            if (currentId > maxId) {
            maxId = currentId;
            }
        }

        return maxId;
      }
      sortAndSend() {
        this.message.sort((a, b) => {
          if (+a.id < +b.id) {
            return -1;
          }
          if (+a.id > +b.id) {
            return 1;
          }
          return 0;
        });
        this.messageChangedEvent.next(this.message.slice());
      }
      getMessages() {
        this.http.get('http://localhost:3000/messages').subscribe(
          //success method
          (messages: any) => {
            console.log(messages.messages);
            this.message = messages.messages;
            this.sortAndSend();
          },
          //error method
          (error: any) => {
            console.log(error);
          }
        );
      }
    
      addMessage(newMessage: Message) {
        if (!newMessage) {
          return;
        }
    
        // make sure id of the new Message is empty
        newMessage.id = 0;
    
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        // add to database
        this.http
          .post<{ message: string; newMessage: Message }>(
            'http://localhost:3000/messages',
            newMessage,
            { headers: headers }
          )
          .subscribe((responseData) => {
            // add new message to messages
            console.log(responseData.newMessage);
            this.message.push(responseData.newMessage);
            this.sortAndSend();
          });
      }
    
}

