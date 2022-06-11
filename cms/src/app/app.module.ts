import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contact/contact-list/contact-item/contact-item.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DndModule} from 'ng2-dnd'
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    ContactEditComponent,
    DocumentsComponent,
    MessagesComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    DocumentItemComponent,
    DocumentListComponent,
    MessageEditComponent,
    MessageItemComponent,
    MessageListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot()
  ],
  providers: [],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
