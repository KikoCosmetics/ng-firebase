import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

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

    signupForm: FormGroup<SignupForm> = this._formBuilder.group({
        user: ["otaconkiko+codeflow1@gmail.com"],
        pwd: ["123456789"]
    });

    constructor(private readonly _authSrv: AuthService,
                private readonly _formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    register(): void {
        const formValue = this.signupForm.value;
        console.info("SUBMIT", formValue);
        this._authSrv.signUpUser(formValue.user, formValue.pwd);
    }

}
