import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LibraryDetailsComponent } from './library/library-details/library-details.component';
import { LibraryEditComponent } from './library/library-edit/library-edit.component';
import { LibraryListComponent } from './library/library-list/library-list.component';
import { LibraryComponent } from './library/library.component';
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

