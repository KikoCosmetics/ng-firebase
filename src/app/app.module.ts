import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {AuthService} from "./services/auth.service";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule],
    declarations: [
        AppComponent,
        DashboardComponent,
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
