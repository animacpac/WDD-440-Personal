import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PictureComponent } from './picture/picture.component';
import { HeaderComponent } from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PictureDetailComponent } from './picture/picture-detail/picture-detail.component';
import { PictureEditComponent } from './picture/picture-edit/picture-edit.component';
import { PictureItemComponent } from './picture/picture-item/picture-item.component';
import { PictureListComponent } from './picture/picture-list/picture-list.component';

const appRoutes: Routes =[
  { path:'', component: ContactComponent },
  { path:'picture', component: PictureComponent },
  { path:'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    PictureComponent,
    HeaderComponent,
    FooterComponent,
    PictureDetailComponent,
    PictureEditComponent,
    PictureItemComponent,
    PictureListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
