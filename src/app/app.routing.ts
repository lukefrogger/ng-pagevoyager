import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Pages */
import { LoginComponent } from "./login/login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { CreatePlanComponent } from "./create-plan/create-plan.component";
import { ReadingPlanComponent } from "./reading-plan/reading-plan.component";
import { ActivePlansComponent } from "./active-plans/active-plans.component";

const routes :Routes = [
    { 
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'create-account',
        component: CreateAccountComponent
    },
    {
        path: 'current',
        component: ActivePlansComponent
    },
    {
        path: 'search',
        component: BookSearchComponent
    },
    {
        path: 'create',
        component: CreatePlanComponent
    },
    {
        path: 'reading-plan/:id',
        component: ReadingPlanComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}