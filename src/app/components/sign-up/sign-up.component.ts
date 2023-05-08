import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {User} from "firebase/auth";
//
import {AuthService} from "../../services/auth.service";
//
import {finalize, from} from "rxjs";

interface SignupForm {
    user: FormControl<string>;
    pwd: FormControl<string>;
}

@Component({
    selector: "app-sign-up",
    templateUrl: "./sign-up.component.html",
    styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {

    showSpinner: boolean = !1;
    signupForm: FormGroup<SignupForm> = this._formBuilder.group({
        user: ["otaconkiko+codeflow1@gmail.com"],
        pwd: ["123456789"]
    });
    user: User;

    constructor(private readonly _authSrv: AuthService,
                private readonly _formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    delete(): void {
        if (!this.user) {
            return alert("NO USER!");
        }
        this.showSpinner = !0;
        from(this._authSrv.deleteUser(this.user))
            .pipe(finalize(() => this.showSpinner = !1))
            .subscribe({
                next: () => {
                    console.info("DELETED!");
                    this.user = void 0;
                },
                error: (e) => console.warn("DELETION ERROR", e)
            });
    }

    signIn(): void {
        this.showSpinner = !0;
        const formValue = this.signupForm.value;
        console.info("SUBMIT", formValue);
        from(this._authSrv.signInUser(formValue.user, formValue.pwd))
            .pipe(finalize(() => this.showSpinner = !1))
            .subscribe({
                next: (r) => {
                    console.info("LOGIN OK!", r);
                    this.user = r.user;
                },
                error: (e) => {
                    console.warn("LOGIN KO!", e);
                }
            });
    }

    signInWithGoogle(): void {
        console.info("");
        this.showSpinner = !0;
        from(this._authSrv.signInWithGoogle())
            .pipe(finalize(() => this.showSpinner = !1))
            .subscribe({
                next: (user) => {
                    console.info("LOGIN OK!", user);
                    this.user = user;
                },
                error: (e) => {
                    console.warn("LOGIN KO!", e);
                }
            });
    }

    register(): void {
        this.showSpinner = !0;
        const formValue = this.signupForm.value;
        console.info("SUBMIT", formValue);
        from(this._authSrv.signUpUser(formValue.user, formValue.pwd))
            .pipe(finalize(() => this.showSpinner = !1))
            .subscribe({
                next: (r) => {
                    console.info("SIGNUP OK!", r);
                    this.user = r.user;
                },
                error: (e) => {
                    console.warn("SIGNUP KO!", e);
                }
            });
    }

}
