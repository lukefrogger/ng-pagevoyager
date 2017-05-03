import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Pages */
import { LoginComponent } from "./login/login.component";
import { BookSearchComponent } from "./book-search/book-search.component";

const routes :Routes = [
    { 
      path: 'login',
      component: LoginComponent,
    },
    {
        path: 'search',
        component: BookSearchComponent
    },
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}