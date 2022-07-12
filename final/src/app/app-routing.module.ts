import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ContactComponent } from './contact/contact.component';
import { PostListComponent } from './posts/post-list/post-list.component';



const appRoutes: Routes = [
    // { path: '', redirectTo: '/documents', pathMatch: "full" },
    // {
    //     path: 'documents', component: DocumentsComponent, children: [
    //         { path: 'new', component: DocumentEditComponent },
    //         { path: ':id', component: DocumentDetailComponent },
    //         { path: ':id/edit', component: DocumentEditComponent }
    //     ]
    // },
    { path: 'contact', component: ContactComponent },
    { path: 'picture', component: PostListComponent },
  
    // {
    //     path: 'contacts', component: ContactComponent, children: [
    //         { path: 'new', component: ContactEditComponent },
    //         { path: ':id', component: ContactDetailComponent },
    //         { path: ':id/edit', component: ContactEditComponent }
    //     ]
    // }
];

