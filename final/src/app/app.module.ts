import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PictureComponent } from './picture/picture.component';
import { AboutComponent } from './about/about.component';

import { HeaderComponent } from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contact/contact-item/contact-item.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactsFilterPipe } from './contact/contacts-filter.pipe';



const appRoutes: Routes =[
  { path:'', component: PictureComponent },
  { path:'contact', component: PictureComponent },
  { path:'about', component: AboutComponent},
  { path: 'picture', component: ContactComponent,children: [
    { path: 'new', component: ContactEditComponent },
    { path: ':id', component: ContactDetailComponent },
    { path: ':id/edit', component: ContactEditComponent }]},



];

@NgModule({
  declarations: [
    AppComponent,
    PictureComponent,
    AboutComponent,
    ContactComponent,
    ContactDetailComponent,
    ContactEditComponent,
    ContactItemComponent,
    ContactListComponent,
    ContactsFilterPipe,

    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
