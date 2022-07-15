import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PictureComponent } from './picture/picture.component';
import { AboutComponent } from './about/about.component';
import { PicturesFilterPipe } from './library/pictures-filter.pipe';


import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { LibraryComponent } from './library/library.component';
import { LibraryDetailsComponent } from './library/library-details/library-details.component';
import { LibraryEditComponent } from './library/library-edit/library-edit.component';
import { LibraryItemsComponent } from './library/library-items/library-items.component';
import { LibraryListComponent } from './library/library-list/library-list.component';





@NgModule({
  declarations: [
    AppComponent,
    PictureComponent,
    AboutComponent,


    HeaderComponent,
    FooterComponent,
    LibraryComponent,
    LibraryDetailsComponent,
    LibraryEditComponent,
    LibraryItemsComponent,
    LibraryListComponent,
    PicturesFilterPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
