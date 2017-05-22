import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app.routing";

/* Servies */
import { AuthenticateService } from "./services/authenticate.service";
import { DbConnectService } from "./services/db-connect.service";
import { GoogleBooksService } from "./services/google-books.service";
import { GlobalService } from "./services/global.service";

/* Pages */
import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { ReadingPlanComponent } from './reading-plan/reading-plan.component';
import { ActivePlansComponent } from './active-plans/active-plans.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    BookSearchComponent, 
    CreatePlanComponent,
    ReadingPlanComponent,
    CreateAccountComponent,
    ActivePlansComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [AuthenticateService, DbConnectService, GoogleBooksService, GlobalService],
  bootstrap: [AppComponent]
})

export class AppModule { }