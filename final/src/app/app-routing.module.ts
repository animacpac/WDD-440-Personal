import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LibraryDetailsComponent } from './library/library-details/library-details.component';
import { LibraryEditComponent } from './library/library-edit/library-edit.component';
import { LibraryListComponent } from './library/library-list/library-list.component';
import { LibraryComponent } from './library/library.component';
import { PictureComponent } from './picture/picture.component';


const appRoutes: Routes = [

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
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }