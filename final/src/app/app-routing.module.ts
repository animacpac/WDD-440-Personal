import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PictureComponent } from './picture/picture.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






const appRoutes: Routes = [
    // { path: '', redirectTo: '/documents', pathMatch: "full" },
    // {
    //     path: 'documents', component: DocumentsComponent, children: [
    //         { path: 'new', component: DocumentEditComponent },
    //         { path: ':id', component: DocumentDetailComponent },
    //         { path: ':id/edit', component: DocumentEditComponent }
    //     ]
    // },
    { path: 'picture', component: PictureComponent },
    { path: 'contact', component: ContactComponent },
  
    // {
    //     path: 'contacts', component: ContactComponent, children: [
    //         { path: 'new', component: ContactEditComponent },
    //         { path: ':id', component: ContactDetailComponent },
    //         { path: ':id/edit', component: ContactEditComponent }
    //     ]
    // }
];

