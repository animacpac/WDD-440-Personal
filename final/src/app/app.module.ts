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
import { LibraryComponent } from './library/library.component';
import { LibraryDetailsComponent } from './library/library-details/library-details.component';
import { LibraryEditComponent } from './library/library-edit/library-edit.component';
import { LibraryItemsComponent } from './library/library-items/library-items.component';
import { LibraryService } from './library/library-service';
import { LibraryListComponent } from './library/library-list/library-list.component';



const appRoutes: Routes =[
  { path:'', component: PictureComponent },
  { path:'contact', component: PictureComponent },
  { path:'about', component: AboutComponent},
  {
    path: 'picture', component: LibraryComponent,
     children: [
        { path: 'new', component: LibraryEditComponent },
        { path: ':id', component: LibraryDetailsComponent },
        { path: ':id/edit', component: LibraryEditComponent }
    ]
}
  



];

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
