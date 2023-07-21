import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { AuthInterceptorService } from "./core/interceptors/auth-interceptor.service";
import { MainInterceptorService } from "./core/interceptors/main-interceptor.service";
import { SignInComponent } from "./core/views/sign-in/sign-in.component";
import { SignUpComponent } from "./core/views/sign-up/sign-up.component";
import { WelcomeComponent } from "./core/views/welcome/welcome.component";
import { NotFoundComponent } from "./core/views/not-found/not-found.component";
import { SharedModule } from "./shared/shared.module";
import { HomeComponent } from './core/views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      SharedModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
