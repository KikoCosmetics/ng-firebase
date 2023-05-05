import {Injectable} from "@angular/core";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    Auth,
    UserCredential
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    Firestore
} from "firebase/firestore";
import {
    AppCheck,
    initializeAppCheck,
    ReCaptchaEnterpriseProvider
} from "firebase/app-check";
import {FirebaseApp, FirebaseOptions, initializeApp} from "firebase/app";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    get config(): FirebaseOptions {
        return environment.firebaseConfigs.free;
    }

    get loginStatus() {
        return JSON.parse(
            localStorage.getItem("loggedIn") || this._loggedInStatus.toString()
        );
    }

    private _app: FirebaseApp = initializeApp(this.config);
    private _appCheck: AppCheck;
    private _auth: Auth;

    private _loggedInStatus = JSON.parse(
        localStorage.getItem("loggedIn") || "false"
    );

    constructor() {
        this._auth = getAuth(this._app);
        this._appCheck = initializeAppCheck(this._app, {
            provider: new ReCaptchaEnterpriseProvider(environment.recaptchaConfigs.free.key),
            isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
        });
    }

    setLoginStatus(value: boolean) {
        this._loggedInStatus = value;
        localStorage.setItem("loggedIn", "true");
    }

    signUpUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this._auth, email, password);
    }

    signInUser(email: string, password: string) {
        return signInWithEmailAndPassword(this._auth, email, password);
    }

}
