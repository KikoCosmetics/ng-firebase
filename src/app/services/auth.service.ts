import {Injectable} from "@angular/core";
import {AppCheckOptions} from "@firebase/app-check";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    Auth,
    UserCredential,
    User,
    deleteUser
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
    ReCaptchaV3Provider
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
            provider: new ReCaptchaV3Provider(environment.recaptchaConfigs.free.key),

            // Optional argument. If true, the SDK automatically refreshes App Check
            // tokens as needed.
            isTokenAutoRefreshEnabled: true
        } as AppCheckOptions);

    }

    deleteUser(user: User): Promise<void> {
        return deleteUser(user);
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
